import client from "../global/client";
import gql from "graphql-tag";
import { fragment } from "./Photo";
import { PhotoSetQuery } from "generated/graphql";

const QUERY = gql`
  query PhotoSet($photosetId: ID!) {
    photoSet(photosetId: $photosetId) {
      ...Photo
    }
  }
  ${fragment}
`;

export default async function photoSetDataProvider({
  photosetId,
}): Promise<PhotoSetQuery> {
  if (!photosetId) {
    throw new Error("Must provide photosetId");
  }
  const result = await client.query<PhotoSetQuery>({
    query: QUERY,
    variables: { photosetId },
  });
  return result.data;
}
