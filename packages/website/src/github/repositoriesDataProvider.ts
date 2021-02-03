import client from "../global/client";
import gql from "graphql-tag";

const QUERY = gql`
  query GithubRepositories {
    githubRepositories {
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
`;

export default async function repositoriesDataProvider() {
  const result = await client.query({
    query: QUERY,
  });
  return result.data;
}
