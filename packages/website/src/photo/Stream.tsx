import React from "react";
import { fragment } from "./Photo";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { RecentPhotosQuery } from "generated/graphql";
import Photos from "photo/Photos";
import LoadMoreButton from "global/LoadMoreButton";
import Loading from "component/Loading";
import ErrorDisplay from "component/ErrorDisplay";

const QUERY = gql`
  query RecentPhotos($after: ID) {
    page: recentPhotos(first: 20, after: $after) {
      items {
        ...Photo
      }
      hasNextPage
      nextPageCursor
    }
  }
  ${fragment}
`;

const Stream = () => {
  const { data, error, loading, fetchMore } = useQuery<RecentPhotosQuery>(
    QUERY
  );
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Photos photos={data.page.items} />
      <LoadMoreButton data={data} loading={loading} fetchMore={fetchMore} />
    </>
  );
};

export default Stream;
