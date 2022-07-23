import { PhotoFragment } from "generated/graphql";
import { usePageData } from "@mattb.tech/data-fetching";
import * as React from "react";
import Photos, { PhotosLayout } from "./Photos";

const PhotoSet = ({ layout }: { layout: PhotosLayout }) => {
  const { photoSet }: { photoSet: readonly PhotoFragment[] } = usePageData();
  if (!photoSet) {
    return null;
  }
  return <Photos photos={photoSet} layout={layout} />;
};
export default PhotoSet;
