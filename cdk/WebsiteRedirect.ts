import { Bucket, BucketAccessControl, RedirectProtocol } from "@aws-cdk/aws-s3";
import { Construct, Duration } from "@aws-cdk/core";
import {
  CloudFrontWebDistribution,
  CloudFrontAllowedMethods,
  OriginProtocolPolicy,
  ViewerCertificate,
  ViewerProtocolPolicy
} from "@aws-cdk/aws-cloudfront";
import { ARecord, IHostedZone, RecordTarget } from "@aws-cdk/aws-route53";
import { CloudFrontTarget } from "@aws-cdk/aws-route53-targets";
import { DnsValidatedCertificate } from "@aws-cdk/aws-certificatemanager";

export interface WebsiteRedirectProps {
  redirectTo: string;
  hostedZone: IHostedZone;
  domainName: string;
  alternateNames: string[];
}

export default class WebsiteRedirect extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { redirectTo, hostedZone, domainName, alternateNames }: WebsiteRedirectProps
  ) {
    super(scope, id);

    const redirectBucket = new Bucket(this, "RedirectBucket", {
      accessControl: BucketAccessControl.PUBLIC_READ,
      websiteRedirect: {
        hostName: redirectTo,
        protocol: RedirectProtocol.HTTPS
      }
    });

    const certificate = new DnsValidatedCertificate(this, "Certificate", {
      domainName,
      subjectAlternativeNames: alternateNames,
      hostedZone
    });

    const redirectDistribution = new CloudFrontWebDistribution(
      this,
      "RedirectDistribution",
      {
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true,
                defaultTtl: Duration.minutes(5),
                compress: true,
                allowedMethods: CloudFrontAllowedMethods.GET_HEAD,
                forwardedValues: {
                  queryString: false
                }
              }
            ],
            customOriginSource: {
              domainName: redirectBucket.bucketWebsiteDomainName,
              originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY
            }
          }
        ],
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
          aliases: [domainName, ...alternateNames]
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    );

    [domainName, ...alternateNames].forEach((domain, i) => {
      new ARecord(this, `ARecord${i}`, {
        zone: hostedZone,
        recordName: domain,
        ttl: Duration.minutes(5),
        target: RecordTarget.fromAlias(
          new CloudFrontTarget(redirectDistribution)
        )
      });
    });
  }
}
