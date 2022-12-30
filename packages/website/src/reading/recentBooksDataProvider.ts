import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { RecentBooksQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query RecentBooks($after: ID) {
    recentBooks: books(first: 15, after: $after) {
      total
      hasNextPage
      nextPageCursor
      items {
        ...Book
      }
    }
  }

  fragment Book on Book {
    id
    title
    image {
      url
      width
      height
    }
    author
    shelf {
      id
      name
    }
    addedAt
    movedAt
    notes
    rating
  }
`;

const recentBooksDataProvider: DataProvider<never, RecentBooksQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<RecentBooksQuery>({
    query: QUERY,
  });
  return result.data;
};

export default recentBooksDataProvider;

export function useRecentBooks() {
  const { data, loading, fetchMore } = useQuery<RecentBooksQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const { items, total, hasNextPage, nextPageCursor } = data!.recentBooks!;
  return {
    items,
    total,
    hasNextPage,
    loadNextPage: () => fetchMore({ variables: { after: nextPageCursor } }),
    loading,
  };
}
