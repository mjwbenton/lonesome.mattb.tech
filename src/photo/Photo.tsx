import * as React from "react";
import {
  PhotoSource,
  Photo as PhotoType,
} from "@mattb.tech/gatsby-transform-flickr-set";
import Infoline from "../component/Infoline";
import ContentBlock from "../component/ContentBlock";
import LazyLoad from "react-lazyload";

/*
 * The images are the width of the viewport minus padding.
 * See Layout.tsx for the padding at different breakpoints.
 */
const SIZES = `
  (min-width: 768px) calc(100vw - 4rem),
  calc(100vw - 2rem)
`;

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const Photo: React.FunctionComponent<PhotoType & { lazyLoad?: boolean }> = ({
  pageUrl,
  sources,
  mainSource,
  title,
  lazyLoad,
}) => {
  const img = (
    <img
      src={mainSource.url}
      srcSet={generateSrcSet(sources)}
      sizes={SIZES}
      alt={`Image titled "${title}"`}
      className="block max-w-full max-h-95vh"
    />
  );
  return (
    <ContentBlock>
      {lazyLoad ? (
        <LazyLoad once offset={200} placeholder={<div className="h-64" />}>
          {img}
        </LazyLoad>
      ) : (
        img
      )}
      <Infoline externalLinkUrl={pageUrl} externalLinkText="Fl">
        <h3 className="text-xs font-bold">{title}</h3>
      </Infoline>
    </ContentBlock>
  );
};
export default Photo;
