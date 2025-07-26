import { Authenticator } from "cognito-at-edge";

const authenticator = new Authenticator({
  region: "us-east-1",
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  userPoolAppId: process.env.COGNITO_CLIENT_ID!,
  userPoolDomain: process.env.COGNITO_DOMAIN!,
});

export const handler = async (event: any) => authenticator.handle(event);
