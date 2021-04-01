import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query GithubRepositories($first: Int!, $after: ID) {
    githubRepositories(first: $first, after: $after) {
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

const repositoriesDataProvider: DataProvider<never> = async (
  _: never,
  { client }
) => {
  const result = await client.query({
    query: QUERY,
    variables: {
      first: 10,
    },
  });
  return result.data;
};

export default repositoriesDataProvider;

export function useGithubRepositories() {
  const { data, loading, fetchMore } = useQuery(QUERY, {
    variables: { first: 10 },
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
    loadingNextPage: loading,
  };
}
