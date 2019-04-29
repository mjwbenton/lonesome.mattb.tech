import React from "react";
import styled from "styled-components";
import { Track as TrackType } from "@mattb.tech/gatsby-transform-spotify-playlist";
import { StripeElement } from "../component/StripedList";
import TwoRowText from "../component/TwoRowText";

const IMAGE_SIZE = "64px";

const Image = styled.img`
  height: ${IMAGE_SIZE};
  width: ${IMAGE_SIZE};
`;

const Track: React.FunctionComponent<{ track: TrackType; index: number }> = ({
  track,
  index
}) => (
  <StripeElement index={index}>
    <Image src={track.album.images[2].url} />
    <TwoRowText
      row1={track.name}
      row2={track.artists.map(a => a.name).join(", ")}
    />
  </StripeElement>
);
export default Track;
