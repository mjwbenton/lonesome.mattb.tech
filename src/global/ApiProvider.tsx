import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

const ENDPOINT = "https://api.mattb.tech";

const client = new ApolloClient({
  uri: ENDPOINT,
  fetch
});

export default ({ children }: { children: any }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
