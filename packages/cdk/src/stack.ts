import path from "path";
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53targets from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import WebsiteRedirect from "./WebsiteRedirect";

const ZONE_NAME = "mattb.tech";
const DOMAIN_NAME = "mattb.tech";
const HOSTED_ZONE_ID = "Z2GPSB1CDK86DH";

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

    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      accessControl: s3.BucketAccessControl.PUBLIC_READ,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName: DOMAIN_NAME,
      hostedZone: mainHostedZone,
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "Distribution",
      {
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true,
                defaultTtl: cdk.Duration.minutes(5),
                compress: true,
                allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
                forwardedValues: {
                  queryString: false,
                },
              },
            ],
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [DOMAIN_NAME],
          }
        ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    );

    new s3deploy.BucketDeployment(this, "DeploySite", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../public"))],
      destinationBucket: siteBucket,
      distribution,
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
