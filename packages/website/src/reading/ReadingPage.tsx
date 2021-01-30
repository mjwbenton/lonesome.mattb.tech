import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import MarkdownContent from "../markdown/MarkdownContent";
import RecentlyRead, { RecentBooks } from "./RecentlyRead";

type DataFormat = {
  markdownRemark: {
    htmlAst: any;
  };
  api: RecentBooks;
};

const ReadingPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data,
}) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <RecentlyRead recentBooks={data.api.recentBooks} />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
    }
    api {
      recentBooks(limit: 15) {
        title
        link
        rating
        image
        authors
        read
        started_at
        read_at
      }
    }
  }
`;

export default ReadingPage;
