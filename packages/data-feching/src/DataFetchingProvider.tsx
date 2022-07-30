import React, { useContext, useMemo } from "react";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { getClient } from "./client.js";

const PageDataContext = React.createContext<any>({});

export const DataFetchingProvider = ({ children, pageProps }) => {
  const client = useMemo(
    () => getClient(pageProps.apolloCache),
    [pageProps.apolloCache]
  );
  return (
    <ApolloProvider client={client}>
      <PageDataContext.Provider value={pageProps}>
        {children}
      </PageDataContext.Provider>
    </ApolloProvider>
  );
};

export function usePageData() {
  return useContext(PageDataContext);
}
