import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const ENDPOINT = "https://api.mattb.tech/";

const client = new ApolloClient({
  link: createPersistedQueryLink().concat(
    ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: ENDPOINT,
        credentials: "same-origin",
        fetch,
        useGETForQueries: true
      })
    ])
  ),
  cache: new InMemoryCache()
});

export default ({ children }: { children: any }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
