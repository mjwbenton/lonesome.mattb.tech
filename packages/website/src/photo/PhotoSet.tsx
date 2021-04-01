import { PhotoSetQuery } from "generated/graphql";
import { usePageData } from "@mattb.tech/data-fetching";
import * as React from "react";
import Photos from "./Photos";

const PhotoSet = () => {
  const { photoSet }: PhotoSetQuery = usePageData();
  if (!photoSet) {
    return null;
  }
  return <Photos photos={photoSet} />;
};
export default PhotoSet;
