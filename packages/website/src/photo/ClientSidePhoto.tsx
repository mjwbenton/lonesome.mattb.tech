import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Photo, { fragment } from "./Photo";
import ErrorDisplay from "component/ErrorDisplay";
import Spinner from "component/Spinner";
import { PhotoQuery, PhotoQueryVariables } from "generated/graphql";

const QUERY = gql`
  query Photo($p: ID!) {
    photo(photoId: $p) {
      ...Photo
    }
  }
  ${fragment}
`;

const LoadPhoto = ({ p }: { p: string }) => {
  const { data, error } = useQuery<PhotoQuery, PhotoQueryVariables>(QUERY, {
    variables: { p },
  });
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data?.photo) {
    return <Spinner />;
  }
  return (
    <>
      <Photo {...data.photo} />
    </>
  );
};

const ClientSidePhotosWithTag = () => {
  const router = useRouter();
  const p = router.query.p as string | undefined;
  return p ? <LoadPhoto p={p} /> : null;
};

export default ClientSidePhotosWithTag;
