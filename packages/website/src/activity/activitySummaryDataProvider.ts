import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import formatISO from "date-fns/formatISO";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";
import { ActivityQuery } from "generated/graphql";
import subDays from "date-fns/subDays";
import { subYears } from "date-fns";

const baseDate = subDays(new Date(), 1);

const QUERY = gql`
  query Activity(
    $startOfYear: Date!
    $today: Date!
    $thirtyDaysAgo: Date!
    $startOfPreviousYear: Date!
    $todayLastYear: Date!
    $thirtyDaysAgoLastYear: Date!
  ) {
    thisYear: activity(startDate: $startOfYear, endDate: $today) {
      ...ActivityData
    }
    lastYear: activity(
      startDate: $startOfPreviousYear
      endDate: $todayLastYear
    ) {
      ...ActivityData
    }
    trailing30Days: activity(startDate: $thirtyDaysAgo, endDate: $today) {
      ...ActivityData
    }
    lastYearTrailing30Days: activity(
      startDate: $thirtyDaysAgoLastYear
      endDate: $todayLastYear
    ) {
      ...ActivityData
    }
  }

  fragment ActivityData on Activity {
    walkingRunningDistance {
      km
    }
    swimmingDistance {
      km
    }
  }
`;

const activityDataProvider: DataProvider<never, ActivityQuery> = async (
  _: never,
  { client },
) => {
  const result = await client.query<ActivityQuery>({
    query: QUERY,
    variables: buildActivityVariables(),
  });
  return result.data;
};

export default activityDataProvider;

export function useActivity() {
  const { data, loading } = useQuery<ActivityQuery>(QUERY, {
    variables: buildActivityVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    activity: data,
  };
}

export function buildActivityVariables() {
  return {
    startOfYear: formatISO(startOfYear(baseDate), { representation: "date" }),
    today: formatISO(baseDate, { representation: "date" }),
    thirtyDaysAgo: formatISO(subDays(baseDate, 30), {
      representation: "date",
    }),
    startOfPreviousYear: formatISO(startOfYear(subYears(baseDate, 1)), {
      representation: "date",
    }),
    todayLastYear: formatISO(subYears(baseDate, 1), {
      representation: "date",
    }),
    thirtyDaysAgoLastYear: formatISO(subDays(subYears(baseDate, 1), 30), {
      representation: "date",
    }),
    endOfPreviousYear: formatISO(endOfYear(subYears(baseDate, 1)), {
      representation: "date",
    }),
  };
}
