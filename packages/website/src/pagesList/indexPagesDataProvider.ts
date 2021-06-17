import { getAllPageMeta } from "pageMeta";
import { Page } from "./PagesList";
import { DataProvider } from "@mattb.tech/data-fetching";
import sortDate from "./sortDate";
import toDisplayPage from "./toDisplayPage";

const indexPagesDataProvider: DataProvider<
  { indexOf: string },
  { pagesList: Page[] }
> = async ({ indexOf }) => {
  const allPageMeta = await getAllPageMeta();
  return {
    pagesList: allPageMeta
      .filter(({ group }) => group === indexOf)
      .sort(sortDate)
      .map(toDisplayPage),
  };
};

export default indexPagesDataProvider;
