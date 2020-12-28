import * as React from "react";
import { graphql } from "gatsby";
import { Photo as PhotoType } from "@mattb.tech/gatsby-transform-flickr-set";
import SinglePhoto from "./Photo";
import PhotosWrapper from "./PhotosWrapper";

const Photos: React.FunctionComponent<{ data: PhotoSetFragmentType }> = ({
  data,
}) => {
  if (
    !data.markdownRemark.childFlickrSet ||
    !data.markdownRemark.childFlickrSet.photos
  ) {
    return null;
  }
  return (
    <PhotosWrapper>
      {data.markdownRemark.childFlickrSet.photos.map((p, i) => (
        <SinglePhoto {...p} key={p.pageUrl} lazyLoad={i > 1} />
      ))}
    </PhotosWrapper>
  );
};
export default Photos;

export type PhotoSetFragmentType = {
  markdownRemark: {
    childFlickrSet?: {
      photos?: Array<PhotoType>;
    };
  };
};

export const query = graphql`
  fragment PhotoSetFragment on MarkdownRemark {
    childFlickrSet {
      photos {
        id
        title
        pageUrl
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
    }
  }
`;
