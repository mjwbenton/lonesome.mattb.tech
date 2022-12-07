import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import {
  RepositoriesQuery,
  RepositoriesQueryVariables,
} from "generated/graphql";

const QUERY = gql`
  query Repositories($after: ID) {
    page: repositories(first: 10, after: $after) {
      total
      hasNextPage
      nextPageCursor
      items {
        id
        name
        url
        createdAt
        updatedAt
        description
        license
        primaryLanguage
      }
    }
  }
`;

const repositoriesDataProvider: DataProvider<never, void> = async (
  _: never,
  { client }
) => {
  await client.query({
    query: QUERY,
  });
};

export default repositoriesDataProvider;

export function useRepositories() {
  return useQuery<RepositoriesQuery, RepositoriesQueryVariables>(QUERY);
}
