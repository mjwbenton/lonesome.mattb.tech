import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { EnergyUsage } from "generated/graphql";
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

const energyUsageDataProvider: DataProvider<never, EnergyUsage> = async (
  _: never,
  { client },
) => {
  const result = await client.query<EnergyUsage>({
    query: QUERY,
    variables: buildVariables(),
  });
  return result.data;
};

export default energyUsageDataProvider;

export function useEnergyUsage() {
  const { data, loading } = useQuery<EnergyUsage>(QUERY, {
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
    startOfYear: formatISO(startOfYear(BASE_DATE)),
    yesterday: formatISO(endOfDay(subDays(BASE_DATE, 1))),
    thirtyOneDaysAgo: formatISO(startOfDay(subDays(BASE_DATE, 31))),
  };
}
