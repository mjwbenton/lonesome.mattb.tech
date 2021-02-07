import React, { useContext } from "react";

const PageData = React.createContext<any>({});

export const PageDataProvider = PageData.Provider;

export function usePageData() {
  return useContext(PageData);
}
