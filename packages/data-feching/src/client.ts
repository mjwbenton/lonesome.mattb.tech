import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import deepmerge from "deepmerge";
import { parseISO, compareDesc } from "date-fns";

const ENDPOINT = "https://api.mattb.tech/";

const LINK = createPersistedQueryLink({ sha256 }).concat(
  new HttpLink({
    uri: ENDPOINT,
    credentials: "omit",
    fetch,
    useGETForQueries: true,
  })
);

type SortFunction<TItem> = (a: TItem, b: TItem) => number;

function concatPagination<TItem = any>(
  keyArgs: false | string[] = false,
  sort?: SortFunction<TItem>
) {
  return {
    keyArgs,
    merge: (existing, incoming) => {
      if (!existing) {
        return incoming;
      }
      const incomingIds = new Set<string>(
        incoming.items.map(({ __ref }) => __ref)
      );
      const existingItems = existing.items.filter(
        ({ __ref }) => !incomingIds.has(__ref)
      );
      const items = [...existingItems, ...incoming.items];
      if (sort) {
        items.sort(sort);
      }
      return {
        ...existing,
        ...incoming,
        items,
      };
    },
  };
}

type WithMovedAt = { movedAt: string };

const movedAtSort: SortFunction<WithMovedAt> = (a, b) =>
  compareDesc(parseISO(a.movedAt), parseISO(b.movedAt));

const CACHE_CONFIGURATION = {
  typePolicies: {
    Query: {
      fields: {
        githubRepositories: concatPagination(),
        recentGoodreadsBooks: concatPagination(),
        books: concatPagination<WithMovedAt>(false, movedAtSort),
        videoGames: concatPagination<WithMovedAt>(false, movedAtSort),
        movies: concatPagination<WithMovedAt>(false, movedAtSort),
        watching: concatPagination<WithMovedAt>(false, movedAtSort),
        tvSeries: concatPagination<WithMovedAt>(false, movedAtSort),
        tvSeasons: concatPagination<WithMovedAt>(false, movedAtSort),
        recentPhotos: concatPagination(),
        photoSet: concatPagination(["photosetId"]),
        photosWithTag: concatPagination(["tag"]),
      },
    },
  },
};

const CLIENT_SIDE = createClient();

function createClient() {
  return new ApolloClient({
    link: LINK,
    cache: new InMemoryCache(CACHE_CONFIGURATION),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        notifyOnNetworkStatusChange: true,
      },
    },
  });
}

export function getClient(pageCache?: NormalizedCacheObject) {
  const client = typeof window === "undefined" ? createClient() : CLIENT_SIDE;
  if (pageCache) {
    client.cache.restore(
      deepmerge(pageCache, client.cache.extract(), {
        arrayMerge: (target, source) => {
          return source;
        },
      })
    );
  }
  return client;
}
