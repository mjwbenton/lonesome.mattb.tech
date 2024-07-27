import { PhotoFragment } from "generated/graphql";
import { usePageData } from "@mattb.tech/data-fetching";
import * as React from "react";
import Photos, { PhotosLayout } from "./Photos";
import { ApiOgImage } from "global/OgImage";

const PhotoSet = ({ layout }: { layout: PhotosLayout }) => {
  const { photoSet }: { photoSet: readonly PhotoFragment[] } = usePageData();
  if (!photoSet) {
    return null;
  }
  return (
    <>
      <ApiOgImage photo={photoSet[0]} />
      <Photos photos={photoSet} layout={layout} />
    </>
  );
};
export default PhotoSet;
