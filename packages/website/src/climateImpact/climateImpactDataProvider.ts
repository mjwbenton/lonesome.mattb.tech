import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { ClimateImpactQuery } from "generated/graphql";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query ClimateImpact {
    climateImpact {
      trees
      carbonOffsetTonnes
    }
  }
`;

const climateImpactDataProvider: DataProvider<
  never,
  ClimateImpactQuery
> = async (_: never, { client }) => {
  const result = await client.query<ClimateImpactQuery>({
    query: QUERY,
  });
  return result.data;
};

export default climateImpactDataProvider;

export function useClimateImpact() {
  const { data, loading } = useQuery<ClimateImpactQuery>(QUERY, {
    fetchPolicy: "cache-and-network",
  });
  return {
    loading,
    climateImpact: data?.climateImpact,
  };
}
