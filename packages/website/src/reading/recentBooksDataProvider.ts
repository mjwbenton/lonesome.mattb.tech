import client from "../global/client";
import gql from "graphql-tag";

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

export default async function recentBooksDataProvider() {
  const result = await client.query({
    query: QUERY,
  });
  return result.data;
}
