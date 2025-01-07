import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CountsBetweenDatesQuery } from "generated/graphql";
import YEAR_VALUES from "./yearValues";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

const TV_SERIES_LIMIT = 100;

const QUERY = gql`
  query CountsBetweenDates(
    $startDateTime: DateTime!
    $endDateTime: DateTime!
    $startDate: Date!
    $endDate: Date!
    $tvSeriesLimit: Int!
  ) {
    photos(first: 0, startDate: $startDateTime, endDate: $endDateTime) {
      total
    }
    commitStats(startDate: $startDateTime, endDate: $endDateTime) {
      commits
      repositoriesCommittedTo
    }
    books(
      first: 0
      startDate: $startDateTime
      endDate: $endDateTime
      sortBy: ADDED_AT
    ) {
      total
    }
    readBooks: bookShelf(id: Read) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpBooks: bookShelf(id: DidNotFinish) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    movies(
      first: 0
      startDate: $startDateTime
      endDate: $endDateTime
      sortBy: ADDED_AT
    ) {
      total
    }
    tvSeasons(
      first: 0
      startDate: $startDateTime
      endDate: $endDateTime
      sortBy: ADDED_AT
    ) {
      total
    }
    finishedTvSeasons: tvSeasonShelf(id: FinishedSeason) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpTvSeasons: tvSeasonShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    videoGames(
      first: 0
      startDate: $startDateTime
      endDate: $endDateTime
      sortBy: ADDED_AT
    ) {
      total
    }
    completedVideoGames: videoGameShelf(id: Completed) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpVideoGames: videoGameShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $startDateTime
        endDate: $endDateTime
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    tvSeries(
      first: $tvSeriesLimit
      startDate: $startDateTime
      endDate: $endDateTime
      sortBy: MOVED_AT
    ) {
      total
      items {
        shelf {
          id
        }
        seasons {
          id
        }
      }
    }
    activity(startDate: $startDate, endDate: $endDate) {
      swimmingDistance {
        km
      }
      walkingRunningDistance {
        km
      }
    }
    plays(first: 0, startDate: $startDateTime, endDate: $endDateTime) {
      total
    }
  }
`;

export type YearCounts = {
  photos: number;
  books: {
    started: number;
    finished: number;
    gaveUp: number;
  };
  movies: {
    watched: number;
  };
  videoGames: {
    started: number;
    completed: number;
    gaveUp: number;
  };
  tvSeasons: {
    started: number;
    finished: number;
    gaveUp: number;
  };
  commitStats: {
    commits: number;
    repositoriesCommittedTo: number;
  };
  activity: {
    walkingRunningDistance: number;
    swimmingDistance: number;
  };
  tracks: {
    listened: number;
  };
};

export type YearData = {
  year: YearCounts;
  previousYear: YearCounts;
};

async function fetchForYear(
  client: ApolloClient<NormalizedCacheObject>,
  year: number,
): Promise<YearCounts> {
  const result = await client.query<CountsBetweenDatesQuery>({
    query: QUERY,
    variables: {
      startDateTime: `${year}-01-01T00:00:00Z`,
      endDateTime: `${year}-12-31T23:59:59Z`,
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
      tvSeriesLimit: TV_SERIES_LIMIT,
    },
  });
  if (result.data.tvSeries.total > TV_SERIES_LIMIT) {
    throw new Error(
      `Total TV series (${result.data.tvSeries.total}) exceeds fetch limit (${TV_SERIES_LIMIT})`,
    );
  }
  const tvSeriesWithoutSeasons = result.data.tvSeries.items.filter(
    ({ seasons }) => seasons.length === 0,
  );
  const tvSeriesFinished = tvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Finished",
  ).length;
  const tvSeriesGaveUp = tvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "GaveUp",
  ).length;
  const tvSeriesStarted = tvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Watching",
  ).length;
  const value = {
    year,
    photos: result.data.photos.total,
    commitStats: {
      commits: result.data.commitStats.commits,
      repositoriesCommittedTo: result.data.commitStats.repositoriesCommittedTo,
    },
    books: {
      started: result.data.books.total,
      finished: result.data.readBooks?.items.total ?? 0,
      gaveUp: result.data.gaveUpBooks?.items.total ?? 0,
    },
    movies: {
      watched: result.data.movies.total,
    },
    videoGames: {
      started: result.data.videoGames.total,
      completed: result.data.completedVideoGames?.items.total ?? 0,
      gaveUp: result.data.gaveUpVideoGames?.items.total ?? 0,
    },
    tvSeasons: {
      started: result.data.tvSeasons.total + tvSeriesStarted,
      finished:
        result.data.finishedTvSeasons?.items.total ?? 0 + tvSeriesFinished,
      gaveUp: result.data.gaveUpTvSeasons?.items.total ?? 0 + tvSeriesGaveUp,
    },
    activity: {
      walkingRunningDistance: Math.floor(
        result.data.activity.walkingRunningDistance.km,
      ),
      swimmingDistance: Math.floor(result.data.activity.swimmingDistance.km),
    },
    tracks: {
      listened: result.data.plays.total,
    },
  };
  // Check the values are those expected – hacky test to see if any code changes
  // accidentally cause these values to change after the fact
  if (
    year in YEAR_VALUES &&
    JSON.stringify(value) !== JSON.stringify(YEAR_VALUES[year])
  ) {
    console.log(JSON.stringify(value, null, 2));
    throw new Error(`Year values for ${year} have changed unexpectedly`);
  }
  return value;
}

const yearReviewDataProvider: DataProvider<
  { filterYear: number },
  YearData
> = async ({ filterYear }, { client }) => {
  return {
    year: await fetchForYear(client, filterYear),
    previousYear: await fetchForYear(client, filterYear - 1),
  };
};

export default yearReviewDataProvider;
