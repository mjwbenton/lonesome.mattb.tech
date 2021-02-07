import { CloudFrontRequestEvent } from "aws-lambda";

const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;

export const handler = async (event: CloudFrontRequestEvent) => {
  const request = event.Records[0].cf.request;

  if (!request.uri.match(hasExtension)) {
    request.uri = `${request.uri}.html`;
  }

  return request;
};
