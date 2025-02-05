import gql from "graphql-tag";
import { DataProvider, usePageData } from "@mattb.tech/data-fetching";
import { CountsBetweenDatesQuery } from "generated/graphql";
import YEAR_VALUES from "./yearValues";
import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { formatISO } from "date-fns/formatISO";
import { subYears } from "date-fns/subYears";

const TV_SERIES_LIMIT = 100;

const QUERY = gql`
  query CountsBetweenDates(
    $startDateTime: DateTime!
    $endDateTime: DateTime!
    $startDate: Date!
    $endDate: Date!
    $previousStartDateTime: DateTime!
    $previousEndDateTime: DateTime!
    $previousStartDate: Date!
    $previousEndDate: Date!
    $tvSeriesLimit: Int!
  ) {
    photos: photos(first: 0, startDate: $startDateTime, endDate: $endDateTime) {
      total
    }
    previousPhotos: photos(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
    ) {
      total
    }
    commitStats(startDate: $startDateTime, endDate: $endDateTime) {
      commits
      repositoriesCommittedTo
    }
    previousCommitStats: commitStats(
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
    ) {
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
    previousBooks: books(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
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
    previousReadBooks: bookShelf(id: Read) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousGaveUpBooks: bookShelf(id: DidNotFinish) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousMovies: movies(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
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
    previousTvSeasons: tvSeasons(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
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
    previousFinishedTvSeasons: tvSeasonShelf(id: FinishedSeason) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousGaveUpTvSeasons: tvSeasonShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousVideoGames: videoGames(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
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
    previousCompletedVideoGames: videoGameShelf(id: Completed) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousGaveUpVideoGames: videoGameShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $previousStartDateTime
        endDate: $previousEndDateTime
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
    previousTvSeries: tvSeries(
      first: $tvSeriesLimit
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
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
    previousActivity: activity(
      startDate: $previousStartDate
      endDate: $previousEndDate
    ) {
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
    previousPlays: plays(
      first: 0
      startDate: $previousStartDateTime
      endDate: $previousEndDateTime
    ) {
      total
    }
  }
`;

export type YearCounts = {
  year: number;
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

function transformResult(
  year: number,
  data: CountsBetweenDatesQuery,
): YearData {
  // Current year processing
  if (data.tvSeries.total > TV_SERIES_LIMIT) {
    throw new Error(
      `Total TV series (${data.tvSeries.total}) exceeds fetch limit (${TV_SERIES_LIMIT})`,
    );
  }

  const currentTvSeriesWithoutSeasons = data.tvSeries.items.filter(
    ({ seasons }) => seasons.length === 0,
  );
  const currentTvSeriesFinished = currentTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Finished",
  ).length;
  const currentTvSeriesGaveUp = currentTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "GaveUp",
  ).length;
  const currentTvSeriesStarted = currentTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Watching",
  ).length;

  // Previous year processing
  if (data.previousTvSeries.total > TV_SERIES_LIMIT) {
    throw new Error(
      `Total TV series (${data.previousTvSeries.total}) exceeds fetch limit (${TV_SERIES_LIMIT})`,
    );
  }

  const previousTvSeriesWithoutSeasons = data.previousTvSeries.items.filter(
    ({ seasons }) => seasons.length === 0,
  );
  const previousTvSeriesFinished = previousTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Finished",
  ).length;
  const previousTvSeriesGaveUp = previousTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "GaveUp",
  ).length;
  const previousTvSeriesStarted = previousTvSeriesWithoutSeasons.filter(
    ({ shelf }) => shelf.id === "Watching",
  ).length;

  return {
    year: {
      year,
      photos: data.photos.total,
      commitStats: {
        commits: data.commitStats.commits,
        repositoriesCommittedTo: data.commitStats.repositoriesCommittedTo,
      },
      books: {
        started: data.books.total,
        finished: data.readBooks?.items.total ?? 0,
        gaveUp: data.gaveUpBooks?.items.total ?? 0,
      },
      movies: {
        watched: data.movies.total,
      },
      videoGames: {
        started: data.videoGames.total,
        completed: data.completedVideoGames?.items.total ?? 0,
        gaveUp: data.gaveUpVideoGames?.items.total ?? 0,
      },
      tvSeasons: {
        started: data.tvSeasons.total + currentTvSeriesStarted,
        finished:
          data.finishedTvSeasons?.items.total ?? 0 + currentTvSeriesFinished,
        gaveUp: data.gaveUpTvSeasons?.items.total ?? 0 + currentTvSeriesGaveUp,
      },
      activity: {
        walkingRunningDistance: Math.floor(
          data.activity.walkingRunningDistance.km,
        ),
        swimmingDistance: Math.floor(data.activity.swimmingDistance.km),
      },
      tracks: {
        listened: data.plays.total,
      },
    },
    previousYear: {
      year: year - 1,
      photos: data.previousPhotos.total,
      commitStats: {
        commits: data.previousCommitStats.commits,
        repositoriesCommittedTo:
          data.previousCommitStats.repositoriesCommittedTo,
      },
      books: {
        started: data.previousBooks.total,
        finished: data.previousReadBooks?.items.total ?? 0,
        gaveUp: data.previousGaveUpBooks?.items.total ?? 0,
      },
      movies: {
        watched: data.previousMovies.total,
      },
      videoGames: {
        started: data.previousVideoGames.total,
        completed: data.previousCompletedVideoGames?.items.total ?? 0,
        gaveUp: data.previousGaveUpVideoGames?.items.total ?? 0,
      },
      tvSeasons: {
        started: data.previousTvSeasons.total + previousTvSeriesStarted,
        finished:
          data.previousFinishedTvSeasons?.items.total ??
          0 + previousTvSeriesFinished,
        gaveUp:
          data.previousGaveUpTvSeasons?.items.total ??
          0 + previousTvSeriesGaveUp,
      },
      activity: {
        walkingRunningDistance: Math.floor(
          data.previousActivity.walkingRunningDistance.km,
        ),
        swimmingDistance: Math.floor(data.previousActivity.swimmingDistance.km),
      },
      tracks: {
        listened: data.previousPlays.total,
      },
    },
  };
}

const yearReviewDataProvider: DataProvider<
  { filterYear: number },
  YearData
> = async ({ filterYear }, { client }) => {
  const overrideEndDate = isCurrentYear(filterYear) ? new Date() : undefined;

  const result = await client.query<CountsBetweenDatesQuery>({
    query: QUERY,
    variables: buildYearQueryVariables(filterYear, overrideEndDate),
  });

  const value = transformResult(filterYear, result.data);

  // Check the values are those expected
  if (
    !overrideEndDate &&
    filterYear in YEAR_VALUES &&
    JSON.stringify(value.year) !== JSON.stringify(YEAR_VALUES[filterYear])
  ) {
    console.log(JSON.stringify(value.year, null, 2));
    throw new Error(`Year values for ${filterYear} have changed unexpectedly`);
  }
  if (
    !overrideEndDate &&
    filterYear - 1 in YEAR_VALUES &&
    JSON.stringify(value.previousYear) !==
      JSON.stringify(YEAR_VALUES[filterYear - 1])
  ) {
    console.log(JSON.stringify(value.previousYear, null, 2));
    throw new Error(
      `Year values for ${filterYear - 1} have changed unexpectedly`,
    );
  }

  return value;
};

export default yearReviewDataProvider;

/**
 * Hook to load data directly from the API
 * Skips fetching unless its the current year
 */
export function useLiveYearReviewData(year: number) {
  const { data, loading } = useQuery<CountsBetweenDatesQuery>(QUERY, {
    variables: buildYearQueryVariables(
      year,
      isCurrentYear(year) ? new Date() : undefined,
    ),
    skip: !isCurrentYear(year),
    fetchPolicy: "network-only",
  });

  return {
    loading,
    ...(data
      ? transformResult(year, data)
      : { year: undefined, previousYear: undefined }),
  };
}

/*
 * Hook to combine data from build time with data live from the API
 * Uses build data unless its the in progress year, in which case use the
 * build data only until the live data has loaded
 */
export function useYearReviewData(): { loading: boolean } & YearData {
  const fromPage: YearData = usePageData();
  const filterYear = fromPage.year.year;
  const live: { loading: boolean } & Partial<YearData> =
    useLiveYearReviewData(filterYear);
  if (isCurrentYear(filterYear)) {
    return {
      loading: live.loading,
      year: live.year ?? fromPage.year,
      previousYear: live.previousYear ?? fromPage.previousYear,
    };
  } else {
    return {
      loading: false,
      year: fromPage.year,
      previousYear: fromPage.previousYear,
    };
  }
}

function isCurrentYear(year: number) {
  return year === new Date().getFullYear();
}

function buildYearQueryVariables(
  year: number,
  overrideEndDate?: Date | undefined,
) {
  return {
    startDateTime: `${year}-01-01T00:00:00Z`,
    endDateTime: overrideEndDate
      ? formatISO(overrideEndDate)
      : `${year}-12-31T23:59:59Z`,
    startDate: `${year}-01-01`,
    endDate: overrideEndDate
      ? formatISO(overrideEndDate, { representation: "date" })
      : `${year}-12-31`,
    previousStartDateTime: `${year - 1}-01-01T00:00:00Z`,
    previousEndDateTime: overrideEndDate
      ? formatISO(subYears(overrideEndDate, 1))
      : `${year - 1}-12-31T23:59:59Z`,
    previousStartDate: `${year - 1}-01-01`,
    previousEndDate: overrideEndDate
      ? formatISO(subYears(overrideEndDate, 1), { representation: "date" })
      : `${year - 1}-12-31`,
    tvSeriesLimit: TV_SERIES_LIMIT,
  };
}
