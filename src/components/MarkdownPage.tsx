import React from "react";
import { graphql } from "gatsby";
import HtmlHeader from "./HtmlHeader";
import LeftSide from "./LeftSide";
import Photos, { PhotoSetFragmentType } from "./Photos";
import "../../css/style.scss";

type MarkdownRemark = {
  html: string;
};

type DataFormat = {
  markdownRemark: MarkdownRemark;
} & PhotoSetFragmentType;

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data
}) => (
  <div className="mb-body">
    <HtmlHeader />
    <LeftSide />
    <div className="mb-rightside">
      <div
        className="mb-content"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <Photos data={data} />
    </div>
  </div>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      ...PhotoSetFragment
    }
  }
`;

export default MarkdownPage;
