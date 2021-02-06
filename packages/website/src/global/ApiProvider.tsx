import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./client";

export default ({ children }: { children: any }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
