import fetch from "isomorphic-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

const ENDPOINT = "https://api.mattb.tech/";

const httpLink = new HttpLink({
  uri: ENDPOINT,
  credentials: "omit",
  fetch,
  useGETForQueries: true,
});

const persistedQueryLink = createPersistedQueryLink({ sha256 });

const client = new ApolloClient({
  link: persistedQueryLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
