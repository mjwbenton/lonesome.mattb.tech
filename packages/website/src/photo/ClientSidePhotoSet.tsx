import { PhotoSetQuery, PhotoSetQueryVariables } from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { QUERY } from "photo/photoSetDataProvider";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ErrorDisplay from "component/ErrorDisplay";
import LoadMoreButton from "global/LoadMoreButton";
import Message from "component/Message";
import Spinner from "component/Spinner";

const LoadPhotosFromSet = ({ photosetId }: { photosetId: string }) => {
  const { data, error, fetchMore, loading } = useQuery<
    PhotoSetQuery,
    PhotoSetQueryVariables
  >(QUERY, {
    variables: { photosetId },
  });
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data) {
    return <Spinner />;
  }
  if (data.page == null) {
    return <Message>No photoset with id {photosetId}</Message>;
  }
  return (
    <>
      <Photos photos={data.page.items} />
      <LoadMoreButton data={data} fetchMore={fetchMore} loading={loading} />
    </>
  );
};

const ClientSidePhotoSet = () => {
  const router = useRouter();
  const photosetId = router.query.id as string | undefined;
  return photosetId ? <LoadPhotosFromSet photosetId={photosetId} /> : null;
};
export default ClientSidePhotoSet;
