import { PhotoSetQuery } from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { QUERY } from "photo/photoSetDataProvider";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "component/Loading";
import ErrorDisplay from "component/ErrorDisplay";
import LoadMoreButton from "global/LoadMoreButton";

const ClientSidePhotoSet = () => {
  const router = useRouter();
  const photosetId = router.query.id;
  const { data, error, fetchMore, loading } = useQuery<PhotoSetQuery>(QUERY, {
    variables: { photosetId },
  });
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Photos photos={data.page.items} />
      <LoadMoreButton data={data} fetchMore={fetchMore} loading={loading} />
    </>
  );
};
export default ClientSidePhotoSet;
