import * as cdk from "aws-cdk-lib";
import path from "path";
import { StaticWebsite } from "./StaticWebsite";

const HOSTED_ZONE_ID = "Z2GPSB1CDK86DH";
const ZONE_NAME = "mattb.tech";

const ENV = {
  account: "858777967843",
  region: "us-east-1",
};

const app = new cdk.App();
new StaticWebsite(app, "LonesomeWebsite", {
  env: ENV,
  domainName: "lonesome.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-lonesome"),
  enableSSOAuthentication: true,
});
new StaticWebsite(app, "ShareWebsite", {
  env: ENV,
  domainName: "share.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-share"),
  enableSSOAuthentication: false,
});
