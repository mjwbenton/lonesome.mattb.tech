import React from "react";
import SinglePhoto, { fragment } from "../photo/Photo";
import PhotosWrapper from "../photo/PhotosWrapper";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { RecentPhotosQuery } from "generated/graphql";

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
  return (
    <PhotosWrapper>
      {data!.recentPhotos.map((p) => (
        <div key={p?.pageUrl}>
          <SinglePhoto {...p} key={p.pageUrl} />
        </div>
      ))}
    </PhotosWrapper>
  );
};

export default Stream;
