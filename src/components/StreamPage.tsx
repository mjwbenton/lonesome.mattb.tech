import React from "react";
import { graphql } from "gatsby";
import Layout from "./Layout";
import Stream from "./Stream";
import MarkdownContent from "./MarkdownContent";

type DataFormat = {
  markdownRemark: {
    htmlAst: any;
  };
};

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data
}) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <Stream />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
    }
  }
`;

export default MarkdownPage;
