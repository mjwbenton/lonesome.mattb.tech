import React from "react";
import { fragment } from "./Photo";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { RecentPhotosQuery } from "generated/graphql";
import Photos from "photo/Photos";

const QUERY = gql`
  query RecentPhotos {
    recentPhotos {
      ...Photo
    }
  }
  ${fragment}
`;

const Stream = () => {
  const { data, error, loading } = useQuery<RecentPhotosQuery>(QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.toString()}</p>;
  }
  if (!data!.recentPhotos) {
    return <p>Error: No recent photos</p>;
  }
  return <Photos photos={data!.recentPhotos} />;
};

export default Stream;
