import EmbeddedWrapper from "component/EmbeddedWrapper";
import StripedList from "component/StripedList";
import Tile, { Wall } from "component/Tile";
import Track from "playlist/Track";
import { useLikedTracks } from "./likedTracksDataProvider";

export default function LikedTracks() {
  const { loading, likedTracks } = useLikedTracks();

  if (!likedTracks) {
    return null;
  }

  return (
    <EmbeddedWrapper>
      <StripedList>
        {likedTracks?.map((t, i) => (
          <Track track={t} index={i + 1} key={t.id} />
        ))}
      </StripedList>
    </EmbeddedWrapper>
  );
}
