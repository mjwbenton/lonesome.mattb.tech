import { DataProvider } from "@mattb.tech/data-fetching";
import { getAllPageMeta } from "pageMeta";
import { Page } from "./PagesList";
import sortDate from "./sortDate";
import toDisplayPage from "./toDisplayPage";
import getYear from "date-fns/getYear";
import hasDate from "./hasDate";
import appendGroupToTitle from "./appendGroupToTitle";

const pagesInYearDataProvider: DataProvider<
  { filterYear: number },
  { pagesList: Page[] }
> = async ({ filterYear }) => {
  const allPageMeta = await getAllPageMeta();
  return {
    pagesList: allPageMeta
      .filter(({ createdOn }) => createdOn && getYear(createdOn) === filterYear)
      .sort(sortDate)
      .reverse()
      .map(appendGroupToTitle)
      .map(toDisplayPage),
  };
};

export default pagesInYearDataProvider;
