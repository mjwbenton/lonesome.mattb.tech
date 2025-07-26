import { Authenticator } from "cognito-at-edge";

const authenticator = new Authenticator({
  region: "us-east-1",
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  userPoolAppId: process.env.COGNITO_CLIENT_ID!,
  userPoolDomain: process.env.COGNITO_DOMAIN!,
});

export const handler = async (event: any) => {
  // Bypass authentication for test requests
  const testAuthHeader =
    event.Records[0].cf.request.headers["x-lonesome-test-auth"]?.[0]?.value;
  if (testAuthHeader && testAuthHeader === process.env.TEST_AUTH_SECRET) {
    return event.Records[0].cf.request;
  }

  // Proceed with normal authentication
  return authenticator.handle(event);
};
