import client from "../global/client";
import gql from "graphql-tag";

const QUERY = gql`
  query GithubRepositories($first: Int!, $after: ID) {
    githubRepositories(first: $first, after: $after) {
      total
      hasNextPage
      nextPageCursor
      items {
      name
      url
      createdAt
      updatedAt
      description
      license
      primaryLanguage
      readme
    }
  }
  }
`;

export default async function repositoriesDataProvider() {
  const result = await client.query({
    query: QUERY,
    variables: {
      first: 20,
    },
  });
  return result.data;
}
