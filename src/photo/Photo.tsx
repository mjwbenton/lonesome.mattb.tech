import * as React from "react";
import {
  PhotoSource,
  Photo as PhotoType,
} from "@mattb.tech/gatsby-transform-flickr-set";
import Infoline from "../component/Infoline";
import ContentBlock from "../component/ContentBlock";

/*
 * In our Layout we use the tailwind container component which limits our maximum width to the size of the tailwind breakpoints (https://tailwindcss.com/docs/responsive-design).
 * We also add 1 rem padding to each side. We use 20px font-size, so subtract 40px from each value.
 * When we get smaller than 640px we just say that it will be as wide as the viewport (even though it will actually be slightly smaller due to padding)
 */
const SIZES = `
  (min-width: 1536px) 1496px,
  (min-width: 1280px) 1240px,
  (min-width: 1024px) 984px,
  (min-width: 768px) 728px,
  (min-width: 640px) 600px,
  100vw
`;

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const Photo: React.FunctionComponent<PhotoType> = ({
  pageUrl,
  sources,
  mainSource,
  title,
}) => {
  return (
    <ContentBlock>
      <img
        src={mainSource.url}
        srcSet={generateSrcSet(sources)}
        sizes={SIZES}
        alt={`Image titled "${title}"`}
        className="block full-screen-block"
      />
      <Infoline externalLinkUrl={pageUrl} externalLinkText="Fl">
        <h3 className="text-xs font-bold">{title}</h3>
      </Infoline>
    </ContentBlock>
  );
};
export default Photo;
