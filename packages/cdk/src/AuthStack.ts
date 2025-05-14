import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cognito as cognito, aws_iam as iam } from "aws-cdk-lib";

export class AuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "Pool", {
      selfSignUpEnabled: false,
      signInAliases: {
        email: true,
      },
      accountRecovery: cognito.AccountRecovery.NONE,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "Client", {
      userPool,
      generateSecret: false,
    });

    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    const authenticatedUserRole = new iam.Role(this, "AuthenticatedRole", {
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
    });

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      "IdentityPoolRoleAttachment",
      {
        identityPoolId: identityPool.ref,
        roles: {
          authenticated: authenticatedUserRole.roleArn,
        },
        roleMappings: {
          mapping: {
            type: "Token",
            identityProvider: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}:${userPoolClient.userPoolClientId}`,
            ambiguousRoleResolution: "AuthenticatedRole",
          },
        },
      },
    );
  }
}
