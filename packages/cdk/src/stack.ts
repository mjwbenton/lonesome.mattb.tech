import path from "path";
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53targets from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as lambda from "@aws-cdk/aws-lambda";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import WebsiteRedirect from "./WebsiteRedirect";

const ZONE_NAME = "mattb.tech";
const DOMAIN_NAME = "mattb.tech";
const HOSTED_ZONE_ID = "Z2GPSB1CDK86DH";

const OUT_PATH = path.join(__dirname, "../../website/out");

const REDIRECT_DOMAIN_NAMES = [
  {
    hostedZone: "mattb.tech",
    hostedZoneId: "Z2GPSB1CDK86DH",
    domainName: "www.mattb.tech",
    alternateNames: [],
  },
  {
    hostedZone: "mattbenton.co.uk",
    hostedZoneId: "Z37GS1FXPT1S5S",
    domainName: "mattbenton.co.uk",
    alternateNames: ["www.mattbenton.co.uk", "blog.mattbenton.co.uk"],
  },
  {
    hostedZone: "lionsmane.co.uk",
    hostedZoneId: "ZNKR9NWXWS7UU",
    domainName: "lionsmane.co.uk",
    alternateNames: ["www.lionsmane.co.uk"],
  },
];

export class MattbTechWebsite extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mainHostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "HostedZone",
      {
        hostedZoneId: HOSTED_ZONE_ID,
        zoneName: ZONE_NAME,
      }
    );

    const pagesBucket = new s3.Bucket(this, "PagesBucket");
    const assetsBucket = new s3.Bucket(this, "AssetsBucket");

    const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName: DOMAIN_NAME,
      hostedZone: mainHostedZone,
    });

    const routerLambda = new lambda.Function(this, "RouterFunction", {
      runtime: lambda.Runtime.NODEJS_12_X,
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
      domainNames: [DOMAIN_NAME],
      certificate,
    });
    distribution.addBehavior("_next/*", new origins.S3Origin(assetsBucket));

    const pagesDeploy = new s3deploy.BucketDeployment(this, "DeployPages", {
      sources: [
        s3deploy.Source.asset(OUT_PATH, {
          exclude: ["_next"],
        }),
      ],
      destinationBucket: pagesBucket,
      cacheControl: [
        s3deploy.CacheControl.fromString(
          "max-age=0,no-cache,no-store,must-revalidate"
        ),
      ],
      distribution,
    });

    const assetsDeploy = new s3deploy.BucketDeployment(this, "DeployAssets", {
      sources: [
        s3deploy.Source.asset(OUT_PATH, {
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
      zone: mainHostedZone,
      recordName: DOMAIN_NAME,
      ttl: cdk.Duration.minutes(5),
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      ),
    });

    REDIRECT_DOMAIN_NAMES.forEach(
      ({ hostedZone, hostedZoneId, domainName, alternateNames }) => {
        new WebsiteRedirect(this, `RedirectFor${domainName}`, {
          redirectTo: DOMAIN_NAME,
          domainName: domainName,
          alternateNames: alternateNames,
          hostedZone: route53.HostedZone.fromHostedZoneAttributes(
            this,
            `HostedZone${hostedZone}`,
            {
              hostedZoneId,
              zoneName: hostedZone,
            }
          ),
        });
      }
    );
  }
}
