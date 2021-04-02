import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query GithubRepositories($after: ID) {
    githubRepositories(first: 10, after: $after) {
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
  const { data, loading, fetchMore } = useQuery(QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const {
    githubRepositories: { items, total, hasNextPage, nextPageCursor },
  } = data;
  return {
    items,
    total,
    hasNextPage,
    loadNextPage: () => fetchMore({ variables: { after: nextPageCursor } }),
    loading,
  };
}
