import { PhotoFragment } from "generated/graphql";
import Photo from "./Photo";
import PhotosWrapper from "./PhotosWrapper";

export default function Photos({
  photos,
}: {
  photos: ReadonlyArray<PhotoFragment>;
}) {
  return (
    <PhotosWrapper>
      {photos.map((p, i) => (
        <Photo {...p} key={p.pageUrl} lazyLoad={i > 1} />
      ))}
    </PhotosWrapper>
  );
}
