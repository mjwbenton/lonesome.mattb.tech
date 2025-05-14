import * as cdk from "aws-cdk-lib";
import path from "path";
import { StaticWebsite } from "./StaticWebsite";

const HOSTED_ZONE_ID = "Z2GPSB1CDK86DH";
const ZONE_NAME = "mattb.tech";

const app = new cdk.App();
new StaticWebsite(app, "LonesomeWebsite", {
  domainName: "lonesome.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-lonesome"),
  enableSSOAuthentication: false,
});
new StaticWebsite(app, "ShareWebsite", {
  domainName: "share.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-share"),
  enableSSOAuthentication: false,
});

// Temporary to try out auth setup
new StaticWebsite(app, "AuthTestWebsite", {
  domainName: "authtest.lonesome.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-lonesome"),
  enableSSOAuthentication: true,
});
