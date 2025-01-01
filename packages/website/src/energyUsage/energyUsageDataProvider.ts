import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { EnergyUsageQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";
import { formatISO } from "date-fns/formatISO";
import { startOfYear } from "date-fns/startOfYear";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { subDays } from "date-fns/subDays";

const BASE_DATE = new Date();

const QUERY = gql`
  query EnergyUsage(
    $startOfYear: DateTime!
    $yesterday: DateTime!
    $thirtyOneDaysAgo: DateTime!
  ) {
    energyThisYear: energy(startDate: $startOfYear, endDate: $yesterday) {
      ...EnergyData
    }
    energyLast30Days: energy(
      startDate: $thirtyOneDaysAgo
      endDate: $yesterday
    ) {
      ...EnergyData
    }
  }

  fragment EnergyData on Energy {
    gas {
      usage
      missingData
      emissions
    }
    electricity {
      usage
      emissions
      missingData
      mix {
        fuel
        percentage
      }
    }
  }
`;

const energyUsageDataProvider: DataProvider<never, EnergyUsageQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<EnergyUsageQuery>({
    query: QUERY,
    variables: buildVariables(),
  });
  return result.data;
};

export default energyUsageDataProvider;

export function useEnergyUsage() {
  const { data, loading } = useQuery<EnergyUsageQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
    variables: buildVariables(),
  });
  return {
    loading,
    data,
  };
}

function buildVariables() {
  return {
    startOfYear: formatISO(startOfYear(subDays(BASE_DATE, 1))),
    yesterday: formatISO(endOfDay(subDays(BASE_DATE, 1))),
    thirtyOneDaysAgo: formatISO(startOfDay(subDays(BASE_DATE, 31))),
  };
}
