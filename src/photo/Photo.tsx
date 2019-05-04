import * as React from "react";
import styled from "styled-components";
import { large as sizes } from "./sizes";
import {
  PhotoSource,
  Photo as PhotoType
} from "@mattb.tech/gatsby-transform-flickr-set";
import Infoline from "../component/Infoline";
import Block from "../component/Block";

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const PhotoImg = styled.img`
  display: block;
  max-height: 90vh;
  max-width: 100%;
`;

const InfolineTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
`;

const Photo: React.FunctionComponent<PhotoType> = ({
  pageUrl,
  sources,
  mainSource,
  title
}) => {
  return (
    <Block>
      <PhotoImg
        src={mainSource.url}
        srcSet={generateSrcSet(sources)}
        sizes={sizes}
        alt={`Image titled "${title}"`}
      />
      <Infoline externalLinkUrl={pageUrl} externalLinkText="Fl">
        <InfolineTitle>{title}</InfolineTitle>
      </Infoline>
    </Block>
  );
};
export default Photo;
