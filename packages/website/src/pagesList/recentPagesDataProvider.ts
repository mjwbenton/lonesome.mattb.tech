import { DataProvider } from "@mattb.tech/data-fetching";
import { getAllPageMeta } from "pageMeta";
import { Page } from "./PagesList";
import sortDate from "./sortDate";
import toDisplayPage from "./toDisplayPage";
import hasDate from "./hasDate";
import appendGroupToTitle from "./appendGroupToTitle";

const recentPagesDataProvider: DataProvider<
  never,
  { pagesList: Page[] }
> = async () => {
  const allPageMeta = await getAllPageMeta();
  return {
    pagesList: allPageMeta
      .filter(hasDate)
      .sort(sortDate)
      .slice(0, 5)
      .map(appendGroupToTitle)
      .map(toDisplayPage),
  };
};

export default recentPagesDataProvider;
