import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import formatISO from "date-fns/formatISO";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";
import { ActivityQuery } from "generated/graphql";

const QUERY = gql`
  query Activity($startDate: Date!, $endDate: Date!) {
    activity(startDate: $startDate, endDate: $endDate) {
      walkingRunningDistance {
        km
      }
      swimmingDistance {
        km
      }
    }
  }
`;

const activityDataProvider: DataProvider<never, ActivityQuery> = async (
  _: never,
  { client }
) => {
  const result = await client.query<ActivityQuery>({
    query: QUERY,
    variables: buildVariables(),
  });
  return result.data;
};

export default activityDataProvider;

export function useActivity() {
  const { data, loading } = useQuery<ActivityQuery>(QUERY, {
    variables: buildVariables(),
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    activity: data?.activity,
  };
}

function buildVariables() {
  const now = new Date();
  return {
    startDate: formatISO(startOfYear(now), { representation: "date" }),
    endDate: formatISO(endOfYear(now), { representation: "date" }),
  };
}
