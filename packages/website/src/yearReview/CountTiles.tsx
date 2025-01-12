import { usePageData } from "@mattb.tech/data-fetching";
import Tile from "component/Tile";
import { YearData } from "./yearReviewDataProvider";
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
  RiMusicLine,
} from "react-icons/ri";
import React from "react";
import Icon from "component/Icon";
import { PageMeta } from "pageMeta";
import formatNumberChange from "utils/formatNumberChange";

export default function CountTiles({
  showChange = true,
}: {
  showChange?: boolean;
}) {
  const {
    year,
    previousYear,
    filterYearPagesCount,
    previousYearPagesCount,
  }: YearData & {
    filterYearPagesCount: number;
    previousYearPagesCount: number;
  } = usePageData();

  return (
    <>
      <Tile>
        <Icon component={RiArticleLine} />
        Created <strong>{filterYearPagesCount}</strong> pages{" "}
        <NumberChange
          showChange={showChange}
          current={filterYearPagesCount}
          previous={previousYearPagesCount}
        />
      </Tile>
      <Tile>
        <Icon component={RiWalkLine} />
        Walked <strong>{year.activity.walkingRunningDistance}km</strong>{" "}
        <NumberChange
          showChange={showChange}
          current={year.activity.walkingRunningDistance}
          previous={previousYear.activity.walkingRunningDistance}
        />
      </Tile>
      <Tile>
        <Icon component={RiDropLine} />
        Swam <strong>{year.activity.swimmingDistance}km</strong>{" "}
        <NumberChange
          showChange={showChange}
          current={year.activity.swimmingDistance}
          previous={previousYear.activity.swimmingDistance}
        />
      </Tile>
      <Tile>
        <Icon component={RiFilmLine} />
        Watched <strong>{year.movies.watched}</strong> movies{" "}
        <NumberChange
          showChange={showChange}
          current={year.movies.watched}
          previous={previousYear.movies.watched}
        />
      </Tile>
      <Tile>
        <Icon component={RiBookLine} />
        Finished <strong>{year.books.finished}</strong> books.{" "}
        <NumberChange
          showChange={showChange}
          current={year.books.finished}
          previous={previousYear.books.finished}
        />
        <br />
        <span className="text-xs">
          Started {year.books.started}, gave up on {year.books.gaveUp}.
        </span>
      </Tile>
      <Tile>
        <Icon component={RiGamepadLine} />
        Completed <strong>{year.videoGames.completed}</strong> video games.{" "}
        <NumberChange
          showChange={showChange}
          current={year.videoGames.completed}
          previous={previousYear.videoGames.completed}
        />
        <br />
        <span className="text-xs">
          Started {year.videoGames.started}, gave up on {year.videoGames.gaveUp}
          .
        </span>
      </Tile>
      <Tile>
        <Icon component={RiTvLine} />
        Finished <strong>{year.tvSeasons.finished}</strong> TV seasons.{" "}
        <NumberChange
          showChange={showChange}
          current={year.tvSeasons.finished}
          previous={previousYear.tvSeasons.finished}
        />
        <br />
        <span className="text-xs">
          Started {year.tvSeasons.started}, gave up on {year.tvSeasons.gaveUp}.
        </span>
      </Tile>
      <Tile>
        <Icon component={RiMusicLine} />
        Listened to <strong>{year.tracks.listened}</strong> tracks.{" "}
        <NumberChange
          showChange={showChange}
          current={year.tracks.listened}
          previous={previousYear.tracks.listened}
        />
      </Tile>
      <Tile>
        <Icon component={RiGitCommitLine} />
        Committed <strong>{year.commitStats.commits}</strong>{" "}
        <NumberChange
          showChange={showChange}
          current={year.commitStats.commits}
          previous={previousYear.commitStats.commits}
        />{" "}
        times to <strong>{year.commitStats.repositoriesCommittedTo}</strong>{" "}
        <NumberChange
          showChange={showChange}
          current={year.commitStats.repositoriesCommittedTo}
          previous={previousYear.commitStats.repositoriesCommittedTo}
        />{" "}
        repositories
      </Tile>
      <Tile>
        <Icon component={RiCamera2Line} />
        Uploaded <strong>{year.photos}</strong> photos{" "}
        <NumberChange
          showChange={showChange}
          current={year.photos}
          previous={previousYear.photos}
        />
      </Tile>
    </>
  );
}

function NumberChange({
  showChange,
  current,
  previous,
}: {
  showChange: boolean;
  current: number;
  previous: number;
}) {
  return showChange ? (
    <span className="text-xs">({formatNumberChange(current, previous)})</span>
  ) : null;
}
