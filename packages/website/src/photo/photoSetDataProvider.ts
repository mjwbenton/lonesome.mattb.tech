import client from "../global/client";
import gql from "graphql-tag";
import { fragment } from "./Photo";

const QUERY = gql`
  query PhotoSet($photosetId: ID!) {
    photoSet(photosetId: $photosetId) {
      ...Photo
    }
  }
  ${fragment}
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
