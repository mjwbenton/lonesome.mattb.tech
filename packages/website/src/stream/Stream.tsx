import React from "react";
import SinglePhoto from "../photo/Photo";
import PhotosWrapper from "../photo/PhotosWrapper";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Stream = () => {
  const { data, error, loading } = useQuery<{ recentPhotos }>(gql`
    {
      recentPhotos {
        id
        pageUrl
        title
        mainSource {
          url
          height
          width
        }
        sources {
          url
          height
          width
        }
      }
    }
  `);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.toString()}</p>;
  }
  return (
    <PhotosWrapper>
      {data!.recentPhotos.map((p) => (
        <div key={p.pageUrl}>
          <SinglePhoto {...p} key={p.pageUrl} />
        </div>
      ))}
    </PhotosWrapper>
  );
};

export default Stream;
