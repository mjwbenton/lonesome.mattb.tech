import React from "react";
import { graphql } from "gatsby";
import HtmlHeader from "./HtmlHeader";
import LeftSide from "./LeftSide";
import "../../css/style.scss";
import Navigation from "./Navigation";
import Stream from "./Stream";

type MarkdownRemark = {
  html: string;
  frontmatter: {
    title: string;
  };
};

type DataFormat = {
  markdownRemark: MarkdownRemark;
};

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data
}) => (
  <div className="mb-body">
    <HtmlHeader />
    <LeftSide>
      <Navigation />
    </LeftSide>
    <div className="mb-rightside">
      <div
        className="mb-content"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <Stream />
    </div>
  </div>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
    }
  }
`;

export default MarkdownPage;
