import { PhotosWithTagQuery } from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { fragment } from "./Photo";

const QUERY = gql`
  query PhotosWithTag($tag: ID!) {
    photosWithTag(tag: $tag) {
      ...Photo
    }
  }
  ${fragment}
`;

const ClientSidePhotosWithTag = () => {
  const router = useRouter();
  const tag = router.query.tag;
  const { data, error, loading } = useQuery<PhotosWithTagQuery>(QUERY, {
    variables: { tag },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.toString()}</p>;
  }
  return data?.photosWithTag ? <Photos photos={data!.photosWithTag} /> : null;
};
export default ClientSidePhotosWithTag;
