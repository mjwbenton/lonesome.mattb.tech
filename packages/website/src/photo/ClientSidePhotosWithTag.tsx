import { PhotosWithTagQuery } from "generated/graphql";
import * as React from "react";
import Photos from "./Photos";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { fragment } from "./Photo";
import Loading from "component/Loading";
import ErrorDisplay from "component/ErrorDisplay";
import LoadMoreButton from "global/LoadMoreButton";

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

const ClientSidePhotosWithTag = ({ tag }: { tag: string }) => {
  const { data, error, loading, fetchMore } = useQuery<PhotosWithTagQuery>(
    QUERY,
    {
      variables: { tag },
    }
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
export default () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  return tag ? <ClientSidePhotosWithTag tag={tag} /> : null;
};
