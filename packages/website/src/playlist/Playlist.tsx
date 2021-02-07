import * as React from "react";
import Track from "./Track";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import StripedList from "../component/StripedList";
import { usePageData } from "global/pageData";

const Playlist: React.FunctionComponent = () => {
  const { playlist } = usePageData();
  if (!playlist) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      <StripedList>
        {playlist.tracks.map((t, i) => (
          <Track track={t} index={i} key={i} />
        ))}
      </StripedList>
    </MaxWidthWrapper>
  );
};
export default Playlist;
