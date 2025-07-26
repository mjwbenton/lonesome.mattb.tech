import { CloudFrontRequestEvent } from "aws-lambda";

// Build timestamp: 2025-01-16T19:58:00Z - Forces new Lambda version
const HAS_EXTENSION_REGEX = /(.+)\.[a-zA-Z0-9]{2,5}$/;
const HTML_EXTENSION_REGEX = /\.html$/;

function redirectTo(uri: string) {
  return {
    status: "302",
    statusDescription: "Found",
    headers: {
      location: [
        {
          key: "Location",
          value: uri,
        },
      ],
    },
  };
}

export const handler = async (event: CloudFrontRequestEvent) => {
  const request = event.Records[0].cf.request;

  if (request.uri.match(HTML_EXTENSION_REGEX)) {
    return redirectTo(request.uri.replace(HTML_EXTENSION_REGEX, ""));
  }

  if (request.uri.endsWith("/")) {
    request.uri = `${request.uri}index.html`;
  }

  if (!request.uri.match(HAS_EXTENSION_REGEX)) {
    request.uri = `${request.uri}.html`;
  }

  return request;
};
