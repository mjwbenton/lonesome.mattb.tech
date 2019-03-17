import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

const ENDPOINT =
  "https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/graphql";

const client = new ApolloClient({
  uri: ENDPOINT,
  fetch
});

export default ({ children }: { children: any }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
