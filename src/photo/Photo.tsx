import * as React from "react";
import { large as sizes } from "./sizes";
import {
  PhotoSource,
  Photo as PhotoType,
} from "@mattb.tech/gatsby-transform-flickr-set";
import Infoline from "../component/Infoline";
import ContentBlock from "../component/ContentBlock";

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
        sizes={sizes}
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
