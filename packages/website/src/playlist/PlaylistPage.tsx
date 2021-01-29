import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import Playlist, { SpotifyPlaylistFragmentType } from "../playlist/Playlist";
import MarkdownContent from "../markdown/MarkdownContent";

type MarkdownRemarkFragmentType = {
  markdownRemark: {
    htmlAst: any;
  };
};

type DataFormat = MarkdownRemarkFragmentType & SpotifyPlaylistFragmentType;

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data,
}) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <Playlist data={data} />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
      ...SpotifyPlaylistFragment
    }
  }
`;

export default MarkdownPage;
