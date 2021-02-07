import client from "../global/client";
import gql from "graphql-tag";

const QUERY = gql`
  query PhotoSet($photosetId: ID!) {
    photoSet(photosetId: $photosetId) {
      id
      pageUrl
      title
      mainSource {
        url
        width
        height
      }
      sources {
        url
        width
        height
      }
    }
  }
`;

export default async function photoSetDataProvider({ photosetId }) {
  if (!photosetId) {
    throw new Error("Must provide photosetId in frontmatter");
  }
  const result = await client.query({
    query: QUERY,
    variables: { photosetId },
  });
  return result.data;
}
