import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./client";

const ApiProvider = ({ children }: { children: any }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default ApiProvider;
