import React from "react";
import styled from "styled-components";
import { Track as TrackType } from "@mattb.tech/gatsby-transform-spotify-playlist";
import { spacingUnit } from "../../style";

const IMAGE_SIZE = "64px";

const Wrapper = styled.li`
  list-style-type: none;
  display: flex;
  height: calc(${IMAGE_SIZE} + (2 * ${spacingUnit}));
  overflow: hidden;

  :nth-child(even) {
    background-color: #f7f7f7;
  }
`;

const Index = styled.span`
  font-size: 8rem;
  margin-top: -3rem;
  color: #f7f7f7;

  ${Wrapper}:nth-child(even) & {
    color: white;
  }
`;

const Image = styled.img`
  margin: ${spacingUnit};
  height: ${IMAGE_SIZE};
  width: ${IMAGE_SIZE};
`;

const Box = styled.div`
  margin: ${spacingUnit} ${spacingUnit} ${spacingUnit} 0;
  flex: 1;
`;

const Name = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`;

const Artist = styled.span`
  font-style: italic;
`;

const Track: React.FunctionComponent<{ track: TrackType; index: number }> = ({
  track,
  index
}) => (
  <Wrapper>
    <Image src={track.album.images[2].url} />
    <Box>
      <Name>{track.name}</Name>
      <Artist>{track.artists.map(a => a.name).join(", ")}</Artist>
    </Box>
    <Index>{index}</Index>
  </Wrapper>
);
export default Track;
