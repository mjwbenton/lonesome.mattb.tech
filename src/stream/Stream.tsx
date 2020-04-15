import React, { useState, useEffect } from "react";
import { Photo } from "@mattb.tech/gatsby-transform-flickr-set";
import SinglePhoto from "../photo/Photo";
import PhotosWrapper from "../photo/PhotosWrapper";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import P from "../markdown/P";

const Stream = () => {
  const { data, error, loading } = useQuery<{ recentPhotos: Photo[] }>(gql`
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
    return <P>"Loading..."</P>;
  }
  if (error) {
    return <P>{error.toString()}</P>;
  }
  return (
    <PhotosWrapper>
      {data!.recentPhotos.map(p => (
        <div key={p.pageUrl}>
          <SinglePhoto {...p} key={p.pageUrl} />
        </div>
      ))}
    </PhotosWrapper>
  );
};

export default Stream;
