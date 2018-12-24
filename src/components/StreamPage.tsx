import React from "react";
import { graphql } from "gatsby";
import Layout from "./Layout";
import "../../css/style.scss";
import Stream from "./Stream";

type DataFormat = {
  markdownRemark: {
    html: string;
  };
};

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data
}) => (
  <Layout>
    <div
      className="mb-content"
      dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
    />
    <Stream />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
    }
  }
`;

export default MarkdownPage;
