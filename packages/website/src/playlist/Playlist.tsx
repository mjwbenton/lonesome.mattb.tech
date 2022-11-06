import * as React from "react";
import Track from "./Track";
import EmbeddedWrapper from "../component/EmbeddedWrapper";
import StripedList from "../component/StripedList";
import { usePageData } from "@mattb.tech/data-fetching";
import { PlaylistQuery } from "generated/graphql";

const Playlist: React.FunctionComponent = () => {
  const { playlist }: PlaylistQuery = usePageData();
  if (!playlist) {
    return null;
  }
  return (
    <EmbeddedWrapper>
      <StripedList>
        {playlist.tracks.map((t, i) => (
          <Track track={t} index={i + 1} key={t.id} />
        ))}
      </StripedList>
    </EmbeddedWrapper>
  );
};
export default Playlist;
