import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CountsBetweenDatesQuery } from "generated/graphql";
import YEAR_VALUES from "./yearValues";

const QUERY = gql`
  query CountsBetweenDates(
    $startDateTime: DateTime!
    $endDateTime: DateTime!
    $startDate: Date!
    $endDate: Date!
  ) {
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
    activity(startDate: $startDate, endDate: $endDate) {
      swimmingDistance {
        km
      }
      walkingRunningDistance {
        km
      }
    }
  }
`;

export type YearCounts = {
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
};

const yearReviewDataProvider: DataProvider<
  { filterYear: number },
  YearCounts
> = async ({ filterYear }, { client }) => {
  const result = await client.query<CountsBetweenDatesQuery>({
    query: QUERY,
    variables: {
      startDateTime: `${filterYear}-01-01T00:00:00Z`,
      endDateTime: `${filterYear}-12-31T23:59:59Z`,
      startDate: `${filterYear}-01-01`,
      endDate: `${filterYear}-12-31`,
    },
  });
  const value = {
    year: filterYear,
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
      started: result.data.tvSeasons.total,
      finished: result.data.finishedTvSeasons?.items.total ?? 0,
      gaveUp: result.data.gaveUpTvSeasons?.items.total ?? 0,
    },
    activity: {
      walkingRunningDistance: Math.floor(
        result.data.activity.walkingRunningDistance.km
      ),
      swimmingDistance: Math.floor(result.data.activity.swimmingDistance.km),
    },
  };
  // Check the values are those expected – hacky test to see if any code changes
  // accidentally cause these values to change after the fact
  if (
    filterYear in YEAR_VALUES &&
    JSON.stringify(value) !== JSON.stringify(YEAR_VALUES[filterYear])
  ) {
    throw new Error(`Year values for ${filterYear} have changed unexpectedly`);
  }
  return value;
};

export default yearReviewDataProvider;
