import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { LikedTracksQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";
import { fragment } from "playlist/Track";

const QUERY = gql`
  query LikedTracks {
    likedTracks(limit: 5) {
      ...Track
    }
  }
  ${fragment}
`;

const likedTracksDataProvider: DataProvider<never, LikedTracksQuery> = async (
  _: never,
  { client },
) => {
  const result = await client.query<LikedTracksQuery>({
    query: QUERY,
  });
  return result.data;
};

export default likedTracksDataProvider;

export function useLikedTracks() {
  const { data, loading } = useQuery<LikedTracksQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    likedTracks: data?.likedTracks,
  };
}
