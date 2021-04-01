import gql from "graphql-tag";
import { Context } from "global/contextBuilder";

const QUERY = gql`
  query RecentBooks {
    recentBooks(perPage: 15) {
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

export default async function recentBooksDataProvider(
  _: never,
  { client }: Context
) {
  const result = await client.query({
    query: QUERY,
  });
  return result.data;
}
