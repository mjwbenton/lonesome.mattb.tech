import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { RecentBooksQuery } from "generated/graphql";

const QUERY = gql`
  query RecentBooks {
    recentBooks(perPage: 15) {
      id
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
