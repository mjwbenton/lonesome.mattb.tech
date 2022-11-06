import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { PlaylistQuery } from "generated/graphql";
import { fragment } from "./Track";

const QUERY = gql`
  query Playlist($playlistId: ID!) {
    playlist(playlistId: $playlistId) {
      id
      name
      description
      link
      tracks {
        ...Track
      }
    }
  }
  ${fragment}
`;

const playlistDataProvider: DataProvider<
  { playlistId: string },
  PlaylistQuery
> = async ({ playlistId }, { client }) => {
  if (!playlistId) {
    throw new Error("Must provide playlistId");
  }
  const result = await client.query<PlaylistQuery>({
    query: QUERY,
    variables: { playlistId },
  });
  return result.data;
};

export default playlistDataProvider;
