import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import Photos, { PhotoSetFragmentType } from "../photo/Photos";
import Playlist, { SpotifyPlaylistFragmentType } from "../playlist/Playlist";
import MarkdownContent from "./MarkdownContent";

type MarkdownRemarkFragmentType = {
  markdownRemark: {
    htmlAst: any;
  };
};

type DataFormat = MarkdownRemarkFragmentType &
  PhotoSetFragmentType &
  SpotifyPlaylistFragmentType;

const MarkdownPage: React.FunctionComponent<{ data: DataFormat }> = ({
  data
}) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <Photos data={data} />
    <Playlist data={data} />
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
      ...PhotoSetFragment
      ...SpotifyPlaylistFragment
    }
  }
`;

export default MarkdownPage;
