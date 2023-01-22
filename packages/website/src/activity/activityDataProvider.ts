import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import formatISO from "date-fns/formatISO";
import startOfYear from "date-fns/startOfYear";
import { ActivityQuery } from "generated/graphql";
import subDays from "date-fns/subDays";
import { subYears } from "date-fns";
import formatPercentageChange from "util/formatPercentageChange";

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

const activityDataProvider: DataProvider<
  never,
  ReturnType<typeof transformData>
> = async (_: never, { client }) => {
  const result = await client.query<ActivityQuery>({
    query: QUERY,
    variables: buildVariables(),
  });
  return transformData(result.data);
};

export default activityDataProvider;

export function useActivity() {
  const { data, loading } = useQuery<ActivityQuery>(QUERY, {
    variables: buildVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    activity: data ? transformData(data) : undefined,
  };
}

function transformData(data: ActivityQuery) {
  return {
    year: {
      walkingRunningKm: formatKm(data.thisYear.walkingRunningDistance.km),
      walkingRunningPercentageChange: formatPercentageChange(
        data.thisYear.walkingRunningDistance.km,
        data.lastYear.walkingRunningDistance.km
      ),
      swimmingDistanceKm: formatKm(data.thisYear.swimmingDistance.km),
      swimmingDistancePercentageChange: formatPercentageChange(
        data.thisYear.swimmingDistance.km,
        data.lastYear.swimmingDistance.km
      ),
    },
    trailing30: {
      walkingRunningKm: formatKm(data.trailing30Days.walkingRunningDistance.km),
      walkingRunningPercentageChange: formatPercentageChange(
        data.trailing30Days.walkingRunningDistance.km,
        data.lastYearTrailing30Days.walkingRunningDistance.km
      ),
      swimmingDistanceKm: formatKm(data.trailing30Days.swimmingDistance.km),
      swimmingDistancePercentageChange: formatPercentageChange(
        data.trailing30Days.swimmingDistance.km,
        data.lastYearTrailing30Days.swimmingDistance.km
      ),
    },
  };
}

function formatKm(value: number): string {
  return `${value.toFixed(2)}km`;
}

function buildVariables() {
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
  };
}
