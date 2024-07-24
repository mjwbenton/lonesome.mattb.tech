import { PhotoFragment } from "generated/graphql";
import Photo from "./Photo";
import chunk from "lodash.chunk";
import theme from "style/theme.preval";

export type PhotosLayout = "default" | "one_two";

export default function Photos({
  photos,
  layout = "default",
}: {
  photos: ReadonlyArray<PhotoFragment>;
  layout?: PhotosLayout;
}) {
  if (layout === "one_two") {
    return (
      <PhotosWrapper>
        {chunk(photos, 3).map(([p1, p2, p3], i) => (
          <div
            key={p1.pageUrl}
            className="flex flex-col w-full items-start space-y-2"
          >
            <Photo {...p1} lazyLoad={i > 0} />
            <div className="flex flex-col w-full lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0">
              <div className="flex self-start w-[75vw] lg:w-[50vw]">
                <Photo
                  {...p2}
                  lazyLoad={i > 0}
                  sizes={`(min-width: ${theme.screens["lg"]}) 50vw, 75vw`}
                />
              </div>
              <div className="flex self-end w-[75vw] lg:w-[50vw]">
                <Photo
                  {...p3}
                  lazyLoad={i > 0}
                  sizes={`(min-width: ${theme.screens["lg"]}) 50vw, 75vw`}
                />
              </div>
            </div>
          </div>
        ))}
      </PhotosWrapper>
    );
  } else {
    return (
      <PhotosWrapper>
        {photos.map((p, i) => (
          <Photo {...p} key={p.pageUrl} lazyLoad={i > 0} />
        ))}
      </PhotosWrapper>
    );
  }
}

export function PhotosWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className"> & {
    marginless?: boolean;
  },
) {
  const { marginless, ...rest } = props;
  return (
    <div
      {...rest}
      className={`not-prose flex flex-col items-start w-screen -ml-4 md:-ml-8 space-y-16 ${marginless ? "" : "mt-16 mb-16"}`}
    />
  );
}
