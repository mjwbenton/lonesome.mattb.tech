import { PhotoSetQuery } from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { QUERY } from "photo/photoSetDataProvider";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const ClientSidePhotoSet = () => {
  const router = useRouter();
  const photosetId = router.query.id;
  const { data, error, loading } = useQuery<PhotoSetQuery>(QUERY, {
    variables: { photosetId },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.toString()}</p>;
  }
  return data?.photoSet ? <Photos photos={data!.photoSet} /> : null;
};
export default ClientSidePhotoSet;
