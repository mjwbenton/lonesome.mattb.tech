import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import formatISO from "date-fns/formatISO";
import startOfYear from "date-fns/startOfYear";
import { ActivityChartQuery } from "generated/graphql";
import subDays from "date-fns/subDays";
import subYears from "date-fns/subYears";
import endOfYear from "date-fns/endOfYear";

const baseDate = subDays(new Date(), 1);

const QUERY = gql`
  query ActivityChart(
    $startOfYear: Date!
    $today: Date!
    $startOfPreviousYear: Date!
    $endOfPreviousYear: Date!
  ) {
    thisYear: activity(startDate: $startOfYear, endDate: $today) {
      ...ActivityChartData
    }
    lastYear: activity(
      startDate: $startOfPreviousYear
      endDate: $endOfPreviousYear
    ) {
      ...ActivityChartData
    }
  }

  fragment ActivityChartData on Activity {
    walkingRunningDistance {
      months {
        km
        month
        year
      }
    }
    swimmingDistance {
      months {
        km
        month
        year
      }
    }
  }
`;

const activityChartDataProvider: DataProvider<
  never,
  ReturnType<typeof transformData>
> = async (_: never, { client }) => {
  const result = await client.query<ActivityChartQuery>({
    query: QUERY,
    variables: buildVariables(),
  });
  return transformData(result.data);
};

export default activityChartDataProvider;

export function useActivityCharts() {
  const { data, loading } = useQuery<ActivityChartQuery>(QUERY, {
    variables: buildVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    activity: data ? transformData(data) : undefined,
  };
}

type Months = readonly { month: number; km: number }[];

export type ActivityChartData = {
  walking: {
    thisYear: Months;
    lastYear: Months;
  };
  swimming: {
    thisYear: Months;
    lastYear: Months;
  };
};

function transformData(data: ActivityChartQuery): ActivityChartData {
  return {
    walking: {
      thisYear: data.thisYear.walkingRunningDistance.months,
      lastYear: data.lastYear.walkingRunningDistance.months,
    },
    swimming: {
      thisYear: data.thisYear.swimmingDistance.months,
      lastYear: data.lastYear.swimmingDistance.months,
    },
  };
}

function buildVariables() {
  return {
    startOfYear: formatISO(startOfYear(baseDate), { representation: "date" }),
    today: formatISO(baseDate, { representation: "date" }),
    startOfPreviousYear: formatISO(startOfYear(subYears(baseDate, 1)), {
      representation: "date",
    }),
    endOfPreviousYear: formatISO(endOfYear(subYears(baseDate, 1)), {
      representation: "date",
    }),
  };
}
