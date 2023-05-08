import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import { ActivityPageQuery } from "generated/graphql";
import { buildActivityVariables } from "./activitySummaryDataProvider";

const QUERY = gql`
  query ActivityPage(
    $startOfYear: Date!
    $today: Date!
    $thirtyDaysAgo: Date!
    $startOfPreviousYear: Date!
    $todayLastYear: Date!
    $thirtyDaysAgoLastYear: Date!
    $endOfPreviousYear: Date!
  ) {
    thisYear: activity(startDate: $startOfYear, endDate: $today) {
      ...ActivityChartData
      ...ActivitySummaryData
    }
    lastYear: activity(
      startDate: $startOfPreviousYear
      endDate: $endOfPreviousYear
    ) {
      ...ActivityChartData
    }
    lastYearToDate: activity(
      startDate: $startOfPreviousYear
      endDate: $todayLastYear
    ) {
      ...ActivitySummaryData
    }
    trailing30Days: activity(startDate: $thirtyDaysAgo, endDate: $today) {
      ...ActivitySummaryData
    }
    lastYearTrailing30Days: activity(
      startDate: $thirtyDaysAgoLastYear
      endDate: $todayLastYear
    ) {
      ...ActivitySummaryData
    }
  }

  fragment ActivitySummaryData on Activity {
    walkingRunningDistance {
      km
    }
    swimmingDistance {
      km
    }
  }

  fragment ActivityChartData on Activity {
    walkingRunningDistance {
      months {
        km
        month
        year
      }
      days {
        km
        date
      }
    }
    swimmingDistance {
      months {
        km
        month
        year
      }
      days {
        km
        date
      }
    }
  }
`;

const activityPageDataProvider: DataProvider<never, ActivityPageQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<ActivityPageQuery>({
    query: QUERY,
    variables: buildActivityVariables(),
  });
  return result.data;
};

export default activityPageDataProvider;

export function useActivityPage() {
  const { data, loading } = useQuery<ActivityPageQuery>(QUERY, {
    variables: buildActivityVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    activity: data,
  };
}
