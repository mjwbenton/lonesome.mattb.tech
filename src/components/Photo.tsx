import * as React from "react";
import {
  PhotoSource,
  Photo as PhotoType
} from "@mattb.tech/gatsby-transform-flickr-set";

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const Photo: React.SFC<PhotoType> = ({
  pageUrl,
  sources,
  mainSource,
  title
}) => {
  return (
    <div className="mb-photo">
      <img
        className="mb-photo__image"
        src={mainSource.url}
        srcSet={generateSrcSet(sources)}
        sizes="(max-width: 1090px) 100vw, 63vw"
        alt={`Image titled "${title}"`}
      />
      <div className="mb-photo__infoline">
        <h3 className="mb-photo__infoline__title">{title}</h3>
        <a
          className="mb-photo__infoline__flickr-link"
          href={pageUrl}
          title="Flickr Page"
        >
          Fl
        </a>
      </div>
    </div>
  );
};
export default Photo;
