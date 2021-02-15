import { PhotoSetQuery } from "generated/graphql";
import { usePageData } from "global/pageData";
import * as React from "react";
import SinglePhoto from "./Photo";
import PhotosWrapper from "./PhotosWrapper";

const Photos = () => {
  const { photoSet }: PhotoSetQuery = usePageData();
  if (!photoSet) {
    return null;
  }
  return (
    <PhotosWrapper>
      {photoSet.map((p, i) => (
        <SinglePhoto {...p} key={p.pageUrl} lazyLoad={i > 1} />
      ))}
    </PhotosWrapper>
  );
};
export default Photos;
