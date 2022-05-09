import {
  PhotosWithTagQuery,
  PhotosWithTagQueryVariables,
} from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { fragment } from "./Photo";
import ErrorDisplay from "component/ErrorDisplay";
import LoadMoreButton from "global/LoadMoreButton";
import Spinner from "component/Spinner";

const QUERY = gql`
  query PhotosWithTag($tag: ID!, $after: ID) {
    page: photosWithTag(tag: $tag, first: 20, after: $after) {
      hasNextPage
      nextPageCursor
      items {
        ...Photo
      }
    }
  }
  ${fragment}
`;

const LoadPhotosWithTag = ({ tag }: { tag: string }) => {
  const { data, error, loading, fetchMore } = useQuery<
    PhotosWithTagQuery,
    PhotosWithTagQueryVariables
  >(QUERY, {
    variables: { tag, after: null },
  });
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data) {
    return <Spinner />;
  }
  return (
    <>
      <Photos photos={data.page.items} />
      <LoadMoreButton data={data} loading={loading} fetchMore={fetchMore} />
    </>
  );
};

const ClientSidePhotosWithTag = () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  return tag ? <LoadPhotosWithTag tag={tag} /> : null;
};

export default ClientSidePhotosWithTag;
