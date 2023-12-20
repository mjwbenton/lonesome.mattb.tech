import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { RecordingsQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query Recordings {
    recordings {
      name
      url
    }
  }
`;

const recordingsDataProvider: DataProvider<never, RecordingsQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<RecordingsQuery>({
    query: QUERY,
  });
  return result.data;
};

export default recordingsDataProvider;

export function useRecordings() {
  const { data, loading } = useQuery<RecordingsQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    recordings: data?.recordings,
  };
}
