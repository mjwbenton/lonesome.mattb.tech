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
});
new StaticWebsite(app, "ShareWebsite", {
  domainName: "share.mattb.tech",
  hostedZoneId: HOSTED_ZONE_ID,
  zoneName: ZONE_NAME,
  outPath: path.join(__dirname, "../../website/out-share"),
});
