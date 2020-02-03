import * as cdk from "@aws-cdk/core";
import { MattbTechWebsite } from "./stack";

const app = new cdk.App();
new MattbTechWebsite(app, "Website");
