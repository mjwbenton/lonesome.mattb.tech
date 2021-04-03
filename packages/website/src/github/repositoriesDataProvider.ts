import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";
import { GithubRepositoriesQuery } from "generated/graphql";

const QUERY = gql`
  query GithubRepositories($after: ID) {
    page: githubRepositories(first: 10, after: $after) {
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

export function useGithubRepositories() {
  return useQuery<GithubRepositoriesQuery>(QUERY);
}
