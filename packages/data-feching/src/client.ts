import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  InMemoryCache,
  InMemoryCacheConfig,
  Reference,
  FieldPolicy,
} from "@apollo/client/core/index.js";
import { HttpLink } from "@apollo/client/link/http/index.js";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types.js";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries/index.js";
import { sha256 } from "crypto-hash";
import deepmerge from "deepmerge";
import { compareDesc } from "date-fns/compareDesc";
import { parseISO } from "date-fns/parseISO";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common.js";

const ENDPOINT = "https://api.mattb.tech/";

const LINK = createPersistedQueryLink({ sha256 }).concat(
  new HttpLink({
    uri: ENDPOINT,
    credentials: "omit",
    fetch,
    useGETForQueries: true,
  }),
);

type SortFunction = (
  readField: ReadFieldFunction,
) => (a: Reference, b: Reference) => number;

function concatPagination(
  keyArgs: false | string[] = false,
  sort?: SortFunction,
): FieldPolicy {
  return {
    keyArgs,
    merge: (existing, incoming, { readField }) => {
      if (!existing) {
        return incoming;
      }
      const incomingIds = new Set<string>(
        incoming.items.map(({ __ref }) => __ref),
      );
      const existingItems = existing.items.filter(
        ({ __ref }) => !incomingIds.has(__ref),
      );
      const items: Array<Reference> = [...existingItems, ...incoming.items];
      if (sort) {
        items.sort(sort(readField));
      }
      return {
        ...existing,
        ...incoming,
        items,
      };
    },
  };
}

const movedAtSort: SortFunction = (readField) => (a, b) =>
  compareDesc(
    parseISO(readField("movedAt", a) ?? ""),
    parseISO(readField("movedAt", b) ?? ""),
  );

function cacheByAlias(): FieldPolicy {
  return {
    keyArgs: (args, context) => {
      const aliasOrUndefined = context?.field?.alias?.value;
      return `activity(${aliasOrUndefined ?? JSON.stringify(args)});`;
    },
  };
}

const CACHE_CONFIGURATION: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        githubRepositories: concatPagination(),
        recentGoodreadsBooks: concatPagination(),
        books: concatPagination(false, movedAtSort),
        videoGames: concatPagination(false, movedAtSort),
        movies: concatPagination(false, movedAtSort),
        watching: concatPagination(false, movedAtSort),
        tvSeries: concatPagination(false, movedAtSort),
        tvSeasons: concatPagination(false, movedAtSort),
        recentPhotos: concatPagination(),
        photoSet: concatPagination(["photosetId"]),
        photosWithTag: concatPagination(["tag"]),
        /* These fields are queried by date. This means that the arguments change each day thus invalidating the cache.
         * Instead we put the name of the alias used to query them in as the cache key, which means that the cache can still
         * be used while updated data is fetched*/
        activity: cacheByAlias(),
        commitStats: cacheByAlias(),
      },
    },
  },
};

const CLIENT_SIDE = createClient();

function createClient() {
  return new ApolloClient({
    link: LINK,
    cache: new InMemoryCache(CACHE_CONFIGURATION),
  });
}

export function getClient(
  pageCache?: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  const client = typeof window === "undefined" ? createClient() : CLIENT_SIDE;
  if (pageCache) {
    client.cache.restore(
      deepmerge(pageCache, client.cache.extract(), {
        arrayMerge: (target, source) => {
          return source;
        },
      }),
    );
  }
  return client;
}
