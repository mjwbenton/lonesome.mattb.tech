import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53targets from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as acm from "@aws-cdk/aws-certificatemanager";

const DOMAIN_NAME = {
  domainName: "mattb.tech",
  hostedZone: "mattb.tech",
  hostedZoneId: "Z2GPSB1CDK86DH"
};

const REDIRECT_DOMAIN_NAMES = [
  {
    domainName: "www.mattb.tech",
    hostedZone: "mattb.tech",
    hostedZoneId: "Z2GPSB1CDK86DH"
  },
  {
    domainName: "mattbenton.co.uk",
    hostedZone: "mattbenton.co.uk",
    hostedZoneId: "Z37GS1FXPT1S5S"
  },
  {
    domainName: "www.mattbenton.co.uk",
    hostedZone: "mattbenton.co.uk",
    hostedZoneId: "Z37GS1FXPT1S5S"
  },
  {
    domainName: "blog.mattbenton.co.uk",
    hostedZone: "mattbenton.co.uk",
    hostedZoneId: "Z37GS1FXPT1S5S"
  },
  {
    domainName: "lionsmane.co.uk",
    hostedZone: "lionsmane.co.uk",
    hostedZoneId: "ZNKR9NWXWS7UU"
  },
  {
    domainName: "www.lionsmane.co.uk",
    hostedZone: "lionsmane.co.uk",
    hostedZoneId: "ZNKR9NWXWS7UU"
  }
];

export class MattbTechWebsite extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      accessControl: s3.BucketAccessControl.PUBLIC_READ,
      websiteIndexDocument: "index.html"
    });

    const certificate = new acm.Certificate(this, "Certificate", {
      domainName: DOMAIN_NAME.domainName,
      subjectAlternativeNames: REDIRECT_DOMAIN_NAMES.map(dn => dn.domainName),
      validationMethod: acm.ValidationMethod.DNS
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
                  queryString: false
                }
              }
            ],
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
            }
          }
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [DOMAIN_NAME.domainName]
          }
        ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    );

    const redirectBucket = new s3.Bucket(this, "RedirectBucket", {
      accessControl: s3.BucketAccessControl.PUBLIC_READ,
      websiteRedirect: {
        hostName: DOMAIN_NAME.domainName,
        protocol: s3.RedirectProtocol.HTTPS
      }
    });

    const redirectDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "RedirectDistribution",
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
                  queryString: false
                }
              }
            ],
            customOriginSource: {
              domainName: redirectBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
            }
          }
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: REDIRECT_DOMAIN_NAMES.map(dn => dn.domainName)
          }
        ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    );

    new route53.ARecord(this, "DomainRecord", {
      zone: route53.HostedZone.fromHostedZoneAttributes(
        this,
        "DomainRecordZone",
        {
          hostedZoneId: DOMAIN_NAME.hostedZoneId,
          zoneName: DOMAIN_NAME.hostedZone
        }
      ),
      recordName: DOMAIN_NAME.domainName,
      ttl: cdk.Duration.minutes(5),
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      )
    });

    REDIRECT_DOMAIN_NAMES.forEach((domainName, i) => {
      new route53.ARecord(this, `RedirectDomainRecord${i}`, {
        zone: route53.HostedZone.fromHostedZoneAttributes(
          this,
          `RedirectDomainRecordZone${i}`,
          {
            hostedZoneId: domainName.hostedZoneId,
            zoneName: domainName.hostedZone
          }
        ),
        recordName: domainName.domainName,
        ttl: cdk.Duration.minutes(5),
        target: route53.RecordTarget.fromAlias(
          new route53targets.CloudFrontTarget(redirectDistribution)
        )
      });
    });
  }
}
