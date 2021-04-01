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

const ENDPOINT = "https://api.mattb.tech/";

const LINK = createPersistedQueryLink({ sha256 }).concat(
  new HttpLink({
    uri: ENDPOINT,
    credentials: "omit",
    fetch,
    useGETForQueries: true,
  })
);

function concatPagination() {
  return {
    keyArgs: false as const,
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
      return {
        ...existing,
        ...incoming,
        items: [...existingItems, ...incoming.items],
      };
    },
  };
}

const CACHE_CONFIGURATION = {
  typePolicies: {
    Query: {
      fields: {
        githubRepositories: concatPagination(),
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
