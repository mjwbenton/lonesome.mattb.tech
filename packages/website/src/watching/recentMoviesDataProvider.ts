import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { RecentMoviesQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query RecentMovies($after: ID) {
    recentMovies: movies(first: 15, after: $after) {
      total
      hasNextPage
      nextPageCursor
      items {
        ...Movie
      }
    }
  }

  fragment Movie on Movie {
    id
    title
    image {
      url
      width
      height
    }
    releaseYear
    movedAt
    notes
    rating
  }
`;

const recentMoviesDataProvider: DataProvider<never, RecentMoviesQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<RecentMoviesQuery>({
    query: QUERY,
  });
  return result.data;
};

export default recentMoviesDataProvider;

export function useRecentMovies() {
  const { data, loading, fetchMore } = useQuery<RecentMoviesQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const { items, total, hasNextPage, nextPageCursor } = data!.recentMovies!;
  return {
    items,
    total,
    hasNextPage,
    loadNextPage: () => fetchMore({ variables: { after: nextPageCursor } }),
    loading,
  };
}
