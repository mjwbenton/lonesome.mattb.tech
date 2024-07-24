import path from "path";
import * as cdk from "aws-cdk-lib";
import {
  aws_s3 as s3,
  aws_route53 as route53,
  aws_route53_targets as route53targets,
  aws_cloudfront as cloudfront,
  aws_certificatemanager as acm,
  aws_s3_deployment as s3deploy,
  aws_lambda as lambda,
} from "aws-cdk-lib";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";

export type StaticWebsiteProps = cdk.StackProps & {
  domainName: string;
  hostedZoneId: string;
  zoneName: string;
  outPath: string;
};

export class StaticWebsite extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticWebsiteProps) {
    super(scope, id, props);
    const { domainName, hostedZoneId, zoneName, outPath } = props;

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "HostedZone",
      {
        hostedZoneId,
        zoneName,
      },
    );

    const pagesBucket = new s3.Bucket(this, "PagesBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });
    const assetsBucket = new s3.Bucket(this, "AssetsBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName,
      hostedZone,
    });

    const routerLambda = new lambda.Function(this, "RouterFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "dist/index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../edge-router")),
    });

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(pagesBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            functionVersion: routerLambda.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
          },
        ],
      },
      domainNames: [domainName],
      certificate,
    });
    distribution.addBehavior("_next/*", new origins.S3Origin(assetsBucket));

    new s3deploy.BucketDeployment(this, "DeployPages", {
      sources: [
        s3deploy.Source.asset(outPath, {
          exclude: ["_next"],
        }),
      ],
      destinationBucket: pagesBucket,
      cacheControl: [
        s3deploy.CacheControl.fromString(
          "max-age=0,no-cache,no-store,must-revalidate",
        ),
      ],
      distribution,
    });

    new s3deploy.BucketDeployment(this, "DeployAssets", {
      sources: [
        s3deploy.Source.asset(outPath, {
          exclude: ["*.html"],
        }),
      ],
      destinationBucket: assetsBucket,
      cacheControl: [
        s3deploy.CacheControl.fromString("max-age=31536000,public,immutable"),
      ],
      distribution,
      prune: false,
    });

    new route53.ARecord(this, "DomainRecord", {
      zone: hostedZone,
      recordName: domainName,
      ttl: cdk.Duration.minutes(5),
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution),
      ),
    });
  }
}
