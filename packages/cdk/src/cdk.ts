import * as cdk from "aws-cdk-lib";
import { LonesomeWebsite } from "./LonesomeWebsite";

const app = new cdk.App();
new LonesomeWebsite(app, "LonesomeWebsite");
