import * as React from "react";
import { graphql } from "gatsby";
import { PhotoSource } from "@mattb/gatsby-transform-flickr-set";
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
    <div className="mb-photos">
      <ul>
        {data.markdownRemark.childFlickrSet.photos.map(p => (
          <li key={p.pageUrl}>
            <SinglePhoto {...p} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Photos;

export type PhotoSetFragmentType = {
  markdownRemark: {
    childFlickrSet?: {
      photos?: Array<{
        title: string;
        pageUrl: string;
        mainSource: PhotoSource;
        sources: PhotoSource[];
      }>;
    };
  };
};

export const query = graphql`
  fragment PhotoSetFragment on MarkdownRemark {
    childFlickrSet {
      photos {
        title
        pageUrl
        mainSource {
          url
          pageUrl
          width
          height
          sizeLabel
        }
        sources {
          url
          pageUrl
          width
          height
          sizeLabel
        }
      }
    }
  }
`;
