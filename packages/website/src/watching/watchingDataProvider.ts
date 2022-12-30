import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { WatchingQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query Watching($after: ID) {
    watching(first: 15, after: $after) {
      total
      hasNextPage
      nextPageCursor
      items {
        __typename
        ...Movie
        ...TvSeries
      }
    }
  }

  fragment TvSeries on TvSeries {
    id
    title
    image {
      url
      width
      height
    }
    shelf {
      id
      name
    }
    releaseYear
    movedAt
    addedAt
    notes
    rating
    seasons {
      id
      seasonNumber
      seasonTitle
      rating
      movedAt
      addedAt
      shelf {
        id
        name
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
    shelf {
      name
    }
    releaseYear
    movedAt
    notes
    rating
  }
`;

const watchingDataProvider: DataProvider<never, WatchingQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<WatchingQuery>({
    query: QUERY,
  });
  return result.data;
};

export default watchingDataProvider;

export function useWatching() {
  const { data, loading, fetchMore } = useQuery<WatchingQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const { items, total, hasNextPage, nextPageCursor } = data!.watching!;
  return {
    items,
    total,
    hasNextPage,
    loadNextPage: () => fetchMore({ variables: { after: nextPageCursor } }),
    loading,
  };
}
