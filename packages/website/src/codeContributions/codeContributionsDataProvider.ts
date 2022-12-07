import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CodeContributionsQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query CodeContributions {
    commitStats {
      commits
      repositoriesCommittedTo
    }
  }
`;

const climateImpactDataProvider: DataProvider<
  never,
  CodeContributionsQuery
> = async (_: never, { client }) => {
  const result = await client.query<CodeContributionsQuery>({
    query: QUERY,
  });
  return result.data;
};

export default climateImpactDataProvider;

export function useCodeContributions() {
  const { data, loading } = useQuery<CodeContributionsQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  return {
    loading,
    codeContributions: data?.commitStats,
  };
}
