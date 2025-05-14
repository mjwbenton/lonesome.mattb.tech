import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { Authenticator } from "cognito-at-edge";

const SSM_CLIENT = new SSMClient();

async function getParameter(name: string) {
  const command = new GetParameterCommand({ Name: name });
  const response = await SSM_CLIENT.send(command);
  return response.Parameter?.Value;
}

async function buildAuthenticator() {
  const COGNITO_USER_POOL_ID = await getParameter("/mattb-sso/user-pool-id");
  const COGNITO_CLIENT_ID = await getParameter(
    "/mattb-sso/user-pool-client-id",
  );

  if (!COGNITO_USER_POOL_ID || !COGNITO_CLIENT_ID) {
    throw new Error("Missing Cognito parameters");
  }

  return new Authenticator({
    region: "us-east-1",
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolAppId: COGNITO_CLIENT_ID,
    userPoolDomain: "mattb-sso.auth.us-east-1.amazoncognito.com",
  });
}

const AUTHENTICATOR_PROMISE = buildAuthenticator();

exports.handler = async (request) => {
  const authenticator = await AUTHENTICATOR_PROMISE;
  return authenticator.handle(request);
};
