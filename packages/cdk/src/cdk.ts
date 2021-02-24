import * as cdk from "@aws-cdk/core";
import { LonesomeWebsite } from "./stack";

const app = new cdk.App();
new LonesomeWebsite(app, "LonesomeWebsite");
