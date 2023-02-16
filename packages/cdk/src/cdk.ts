import * as cdk from "aws-cdk-lib";
import { LonesomeCi } from "./LonesomeCi";
import { LonesomeWebsite } from "./LonesomeWebsite";

const app = new cdk.App();
new LonesomeWebsite(app, "LonesomeWebsite");
new LonesomeCi(app, "LonesomeCi");
