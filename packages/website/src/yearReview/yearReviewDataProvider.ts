import gql from "graphql-tag";
import { DataProvider } from "@mattb.tech/data-fetching";
import { CountsBetweenDatesQuery } from "generated/graphql";

const QUERY = gql`
  query CountsBetweenDates($startDate: DateTime, $endDate: DateTime) {
    books(
      first: 0
      startDate: $startDate
      endDate: $endDate
      sortBy: ADDED_AT
    ) {
      total
    }
    readBooks: bookShelf(id: Read) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpBooks: bookShelf(id: DidNotFinish) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    movies(
      first: 0
      startDate: $startDate
      endDate: $endDate
      sortBy: ADDED_AT
    ) {
      total
    }
    tvSeasons(
      first: 0
      startDate: $startDate
      endDate: $endDate
      sortBy: ADDED_AT
    ) {
      total
    }
    finishedTvSeasons: tvSeasonShelf(id: FinishedSeason) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpTvSeasons: tvSeasonShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    videoGames(
      first: 0
      startDate: $startDate
      endDate: $endDate
      sortBy: ADDED_AT
    ) {
      total
    }
    completedVideoGames: videoGameShelf(id: Completed) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
      }
    }
    gaveUpVideoGames: videoGameShelf(id: GaveUp) {
      items(
        first: 0
        startDate: $startDate
        endDate: $endDate
        sortBy: MOVED_AT
      ) {
        total
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
};

const yearReviewDataProvider: DataProvider<
  { filterYear: number },
  YearCounts
> = async ({ filterYear }, { client }) => {
  const result = await client.query<CountsBetweenDatesQuery>({
    query: QUERY,
    variables: {
      startDate: `${filterYear}-01-01T00:00:00Z`,
      endDate: `${filterYear}-12-31T23:59:59Z`,
    },
  });
  return {
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
  };
};

export default yearReviewDataProvider;
