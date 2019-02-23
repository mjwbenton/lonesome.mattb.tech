import * as React from "react";
import { graphql } from "gatsby";
import { Photo as PhotoType } from "@mattb.tech/gatsby-transform-flickr-set";
import SinglePhoto from "./Photo";

const Photos: React.FunctionComponent<{ data: PhotoSetFragmentType }> = ({
  data
}) => {
  if (
    !data.markdownRemark.childFlickrSet ||
    !data.markdownRemark.childFlickrSet.photos
  ) {
    return null;
  }
  return (
    <div>
      {data.markdownRemark.childFlickrSet.photos.map(p => (
        <div key={p.pageUrl}>
          <SinglePhoto {...p} key={p.pageUrl} />
        </div>
      ))}
    </div>
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
