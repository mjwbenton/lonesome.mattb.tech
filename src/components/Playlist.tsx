import * as React from "react";
import { graphql } from "gatsby";
import {
  Playlist as PlaylistType,
  Track as TrackType
} from "@mattb.tech/gatsby-transform-spotify-playlist";

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
      <ul className="mb-playlist">
        {playlist.tracks.map((t, i) => (
          <Track track={t} index={i} />
        ))}
      </ul>
    </div>
  );
};
export default Playlist;

const Track: React.FunctionComponent<{ track: TrackType; index: number }> = ({
  track,
  index
}) => (
  <li className="mb-track">
    <img className="mb-track__image" src={track.album.images[2].url} />
    <div className="mb-track__text-box">
      <h3 className="mb-track__name">{track.name}</h3>
      <i className="mb-track__artist">
        {track.artists.map(a => a.name).join(", ")}
      </i>
    </div>
    <span className="mb-track__index">{index}</span>
  </li>
);

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
