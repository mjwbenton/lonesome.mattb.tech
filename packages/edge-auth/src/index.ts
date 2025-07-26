import { Authenticator } from "cognito-at-edge";

const authenticator = new Authenticator({
  region: "us-east-1",
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  userPoolAppId: process.env.COGNITO_CLIENT_ID!,
  userPoolDomain: process.env.COGNITO_DOMAIN!,
  logoutConfiguration: {
    logoutUri: "/",
    logoutRedirectUri: "/",
  },
});

export const handler = async (event: any) => authenticator.handle(event);
