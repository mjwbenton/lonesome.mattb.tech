import * as React from "react";
import Track from "./Track";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import StripedList from "../component/StripedList";
import { usePageData } from "@mattb.tech/data-fetching";
import { PlaylistQuery } from "generated/graphql";

const Playlist: React.FunctionComponent = () => {
  const { playlist }: PlaylistQuery = usePageData();
  if (!playlist) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      <StripedList>
        {playlist.tracks.map((t, i) => (
          <Track track={t} index={i + 1} key={i} />
        ))}
      </StripedList>
    </MaxWidthWrapper>
  );
};
export default Playlist;
