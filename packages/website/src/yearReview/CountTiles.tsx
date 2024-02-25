import { usePageData } from "@mattb.tech/data-fetching";
import Tile from "component/Tile";
import { YearCounts } from "./yearReviewDataProvider";
import {
  RiTvLine,
  RiGamepadLine,
  RiFilmLine,
  RiBookLine,
  RiArticleLine,
  RiGitCommitLine,
  RiDropLine,
  RiWalkLine,
  RiCamera2Line,
} from "react-icons/ri";
import React from "react";
import Icon from "component/Icon";
import { PageMeta } from "pageMeta";

export default function CountTiles() {
  const {
    photos,
    movies,
    books,
    tvSeasons,
    videoGames,
    pagesList,
    commitStats,
    activity,
  }: YearCounts & { pagesList: PageMeta[] } = usePageData();

  return (
    <>
      <Tile>
        <Icon component={RiArticleLine} />
        Created <strong>{pagesList.length}</strong> pages
      </Tile>
      <Tile>
        <Icon component={RiWalkLine} />
        Walked <strong>{activity.walkingRunningDistance}km</strong>
      </Tile>
      <Tile>
        <Icon component={RiDropLine} />
        Swam <strong>{activity.swimmingDistance}km</strong>
      </Tile>
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
      <Tile>
        <Icon component={RiGitCommitLine} />
        Committed <strong>{commitStats.commits}</strong> times to{" "}
        <strong>{commitStats.repositoriesCommittedTo}</strong> repositories
      </Tile>
      <Tile>
        <Icon component={RiCamera2Line} />
        Took <strong>{photos}</strong> photos
      </Tile>
    </>
  );
}
