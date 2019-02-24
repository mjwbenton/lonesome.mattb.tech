import * as React from "react";
import { graphql } from "gatsby";
import {
  Playlist as PlaylistType,
  Track as TrackType
} from "@mattb.tech/gatsby-transform-spotify-playlist";
import Track from "./Track";

const Playlist: React.FunctionComponent<{
  data: SpotifyPlaylistFragmentType;
}> = ({ data }) => {
  if (!data.markdownRemark.childSpotifyPlaylist) {
    return null;
  }
  const playlist = data.markdownRemark.childSpotifyPlaylist.playlist;
  if (!playlist) {
    return null;
  }
  return (
    <div>
      <a href={playlist.link}>View on Spotify</a>
      <ul>
        {playlist.tracks.map((t, i) => (
          <Track track={t} index={i} key={i} />
        ))}
      </ul>
    </div>
  );
};
export default Playlist;

export type SpotifyPlaylistFragmentType = {
  markdownRemark: {
    childSpotifyPlaylist?: {
      playlist?: PlaylistType;
    };
  };
};

export const query = graphql`
  fragment SpotifyPlaylistFragment on MarkdownRemark {
    childSpotifyPlaylist {
      playlist {
        name
        description
        link
        tracks {
          artists {
            name
          }
          album {
            name
            images {
              url
              height
              width
            }
          }
          name
        }
      }
    }
  }
`;
