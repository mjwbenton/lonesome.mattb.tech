import gql from "graphql-tag";
import { fragment } from "./Photo";
import { PhotoSetQuery } from "generated/graphql";
import { DataProvider } from "@mattb.tech/data-fetching";

export const QUERY = gql`
  query PhotoSet($photosetId: ID!) {
    photoSet(photosetId: $photosetId) {
      ...Photo
    }
  }
  ${fragment}
`;

const photoSetDataProvider: DataProvider<
  { photosetId: string },
  PhotoSetQuery
> = async ({ photosetId }, { client }) => {
  if (!photosetId) {
    throw new Error("Must provide photosetId");
  }
  const result = await client.query<PhotoSetQuery>({
    query: QUERY,
    variables: { photosetId },
  });
  return result.data;
};

export default photoSetDataProvider;
