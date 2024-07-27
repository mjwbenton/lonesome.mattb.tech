import { PhotoFragment } from "generated/graphql";
import Head from "next/head";

const MIN_WIDTH = 1200;

export function ApiOgImage({ photo }: { photo: PhotoFragment }) {
  return (
    <Head>
      <meta
        property="og:image"
        content={
          (
            photo.sources.find(({ width }) => width > MIN_WIDTH) ??
            photo.sources[photo.sources.length - 1]
          ).url
        }
      />
    </Head>
  );
}
