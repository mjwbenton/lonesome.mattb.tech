import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import Photos, { PhotoSetFragmentType } from "../photo/Photos";
import MarkdownContent from "../markdown/MarkdownContent";

type MarkdownRemarkFragmentType = {
  markdownRemark: {
    htmlAst: any;
  };
};

type DataFormat = MarkdownRemarkFragmentType & PhotoSetFragmentType;

const PhotosPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data,
}) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <Photos data={data} />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
      ...PhotoSetFragment
    }
  }
`;

export default PhotosPage;
