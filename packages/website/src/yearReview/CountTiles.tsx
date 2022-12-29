import { usePageData } from "@mattb.tech/data-fetching";
import Tile from "component/Tile";
import { YearCounts } from "./yearReviewDataProvider";
import {
  RiTvLine,
  RiGamepadLine,
  RiFilmLine,
  RiBookLine,
} from "react-icons/ri";
import { IconBaseProps } from "react-icons";
import React from "react";
import Icon from "component/Icon";

export default function CountTiles() {
  const { movies, books, tvSeasons, videoGames }: YearCounts = usePageData();

  return (
    <>
      <Tile>
        <Icon component={RiFilmLine} />
        Watched <strong>{movies.watched}</strong> movies
      </Tile>
      <Tile>
        <Icon component={RiBookLine} />
        Finished <strong>{books.finished}</strong> books. <br />{" "}
        <span className="text-xs">
          Started {books.started}, gave up on {books.gaveUp}.
        </span>
      </Tile>
      <Tile>
        <Icon component={RiGamepadLine} />
        Completed <strong>{videoGames.completed}</strong> video games. <br />{" "}
        <span className="text-xs">
          Started {videoGames.started}, gave up on {videoGames.gaveUp}.
        </span>
      </Tile>
      <Tile>
        <Icon component={RiTvLine} />
        Finished <strong>{tvSeasons.finished}</strong> TV seasons. <br />{" "}
        <span className="text-xs">
          Started {tvSeasons.started}, gave up on {tvSeasons.gaveUp}.
        </span>
      </Tile>
    </>
  );
}
