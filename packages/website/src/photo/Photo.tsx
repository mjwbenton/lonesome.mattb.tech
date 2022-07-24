import * as React from "react";
import Infoline from "../component/Infoline";
import LazyLoad from "react-lazyload";
import gql from "graphql-tag";
import { PhotoFragment } from "generated/graphql";

const DEFAULT_SIZES = `100vw`;

const Photo: React.FunctionComponent<
  PhotoFragment & { lazyLoad?: boolean; sizes?: string }
> = ({
  pageUrl,
  sources,
  mainSource,
  title,
  lazyLoad,
  sizes = DEFAULT_SIZES,
}) => {
  const img = (
    <img
      src={mainSource.url}
      srcSet={generateSrcSet(sources)}
      sizes={sizes}
      alt={`Image titled "${title}"`}
      className="block max-w-full max-h-95vh"
    />
  );
  return (
    <div data-testid="photo-content-block" tabIndex={0}>
      {lazyLoad ? (
        <LazyLoad once offset={200} placeholder={<div className="h-64" />}>
          {img}
        </LazyLoad>
      ) : (
        img
      )}
      <Infoline externalLinkUrl={pageUrl} externalLinkText="Fl">
        <h2 className="text-xs font-bold line-clamp-1">{title}</h2>
      </Infoline>
    </div>
  );
};
export default Photo;

function generateSrcSet(sources: PhotoFragment["sources"]): string {
  return sources
    .map((source) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

export const fragment = gql`
  fragment Photo on Photo {
    id
    pageUrl
    title
    mainSource {
      url
      width
      height
    }
    sources {
      url
      width
      height
    }
  }
`;
