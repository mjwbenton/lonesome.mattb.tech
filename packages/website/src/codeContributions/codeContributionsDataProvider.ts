import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CodeContributionsQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";
import { formatISO } from "date-fns/formatISO";
import { startOfYear } from "date-fns/startOfYear";
import { subDays } from "date-fns/subDays";
import { subYears } from "date-fns/subYears";
import formatPercentageChange from "utils/formatPercentageChange";

const QUERY = gql`
  query CodeContributions(
    $startOfYear: DateTime!
    $today: DateTime!
    $thirtyDaysAgo: DateTime!
    $startOfPreviousYear: DateTime!
    $todayLastYear: DateTime!
    $thirtyDaysAgoLastYear: DateTime!
  ) {
    thisYear: commitStats(startDate: $startOfYear, endDate: $today) {
      commits
      repositoriesCommittedTo
    }
    lastYear: commitStats(
      startDate: $startOfPreviousYear
      endDate: $todayLastYear
    ) {
      commits
    }
    trailing30Days: commitStats(startDate: $thirtyDaysAgo, endDate: $today) {
      commits
      repositoriesCommittedTo
    }
    lastYearTrailing30Days: commitStats(
      startDate: $thirtyDaysAgoLastYear
      endDate: $todayLastYear
    ) {
      commits
    }
  }
`;

const codeContributionsDataProvider: DataProvider<never, void> = async (
  _: never,
  { client },
) => {
  await client.query<CodeContributionsQuery>({
    query: QUERY,
    variables: buildVariables(),
  });
};

export default codeContributionsDataProvider;

export function useCodeContributions() {
  const { data, loading } = useQuery<CodeContributionsQuery>(QUERY, {
    variables: buildVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    codeContributions: {
      year: {
        commits: data?.thisYear.commits,
        repositories: data?.thisYear.repositoriesCommittedTo,
        percentageChange: formatPercentageChange(
          data?.thisYear.commits ?? 0,
          data?.lastYear.commits ?? 0,
        ),
      },
      trailing30: {
        commits: data?.trailing30Days.commits,
        repositories: data?.trailing30Days.repositoriesCommittedTo,
        percentageChange: formatPercentageChange(
          data?.trailing30Days.commits ?? 0,
          data?.lastYearTrailing30Days.commits ?? 0,
        ),
      },
    },
  };
}

function buildVariables() {
  const now = new Date();
  return {
    startOfYear: formatISO(startOfYear(now)),
    today: formatISO(now),
    thirtyDaysAgo: formatISO(subDays(now, 30)),
    startOfPreviousYear: formatISO(startOfYear(subYears(now, 1))),
    todayLastYear: formatISO(subYears(now, 1)),
    thirtyDaysAgoLastYear: formatISO(subDays(subYears(now, 1), 30)),
  };
}
