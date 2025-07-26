import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  COGNITO_USER_POOL_ID: str(),
  COGNITO_CLIENT_ID: str(),
  COGNITO_DOMAIN: str(),
});
