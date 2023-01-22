import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CodeContributionsQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";
import formatISO from "date-fns/formatISO";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";

const QUERY = gql`
  query CodeContributions($startDate: DateTime!, $endDate: DateTime!) {
    thisYearsCommits: commitStats(startDate: $startDate, endDate: $endDate) {
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
    variables: buildVariables(),
  });
  return result.data;
};

export default climateImpactDataProvider;

export function useCodeContributions() {
  const { data, loading } = useQuery<CodeContributionsQuery>(QUERY, {
    variables: buildVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    codeContributions: data?.thisYearsCommits,
  };
}

function buildVariables() {
  const now = new Date();
  return {
    startDate: formatISO(startOfYear(now)),
    endDate: formatISO(endOfYear(now)),
  };
}
