import gql from "graphql-tag";
import { Context } from "global/contextBuilder";

const QUERY = gql`
  query Playlist($playlistId: ID!) {
    playlist(playlistId: $playlistId) {
      name
      description
      link
      tracks {
        name
        artists {
          name
        }
        album {
          name
          images {
            url
            width
            height
          }
        }
      }
    }
  }
`;

export default async function recentBooksDataProvider(
  { playlistId },
  { client }: Context
) {
  if (!playlistId) {
    throw new Error("Must provide playlistId");
  }
  const result = await client.query({
    query: QUERY,
    variables: { playlistId },
  });
  return result.data;
}
