import * as React from "react";
import styled from "styled-components";
import { large as sizes } from "./sizes";
import {
  PhotoSource,
  Photo as PhotoType
} from "@mattb.tech/gatsby-transform-flickr-set";
import { spacingUnit } from "../style/style";

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const PhotoWrapper = styled.div`
  display: inline-block;
  margin-bottom: ${spacingUnit};
`;

const PhotoImg = styled.img`
  display: block;
  max-height: 90vh;
  max-width: 100%;
`;

const Infoline = styled.div`
  background-color: #f7f7f7;
  display: flex;
  padding: 8px;
  width: 100%;
`;

const InfolineTitle = styled.h3`
  display: inline;
  flex: 1;
  font-size: 0.75rem;
  font-weight: 700;
`;

const InfolineFlickrLink = styled.a`
  font-size: 0.75rem;

  :after {
    content: "→";
  }
`;

const Photo: React.FunctionComponent<PhotoType> = ({
  pageUrl,
  sources,
  mainSource,
  title
}) => {
  return (
    <PhotoWrapper>
      <PhotoImg
        src={mainSource.url}
        srcSet={generateSrcSet(sources)}
        sizes={sizes}
        alt={`Image titled "${title}"`}
      />
      <Infoline>
        <InfolineTitle>{title}</InfolineTitle>
        <InfolineFlickrLink href={pageUrl} title="Flickr Page">
          Fl
        </InfolineFlickrLink>
      </Infoline>
    </PhotoWrapper>
  );
};
export default Photo;
