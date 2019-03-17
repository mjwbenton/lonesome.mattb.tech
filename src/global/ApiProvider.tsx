import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";

const ENDPOINT =
  "https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/graphql";

const client = new ApolloClient({
  uri: ENDPOINT
});

export default ({ children }: { children: any }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
