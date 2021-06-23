import { getAllPageMeta } from "pageMeta";
import { Page } from "./PagesList";
import sortDate from "./sortDate";
import toDisplayPage from "./toDisplayPage";

export default async function recentPagesDataProvider(): Promise<{
  pagesList: Page[];
}> {
  const allPageMeta = await getAllPageMeta();
  return {
    pagesList: allPageMeta
      .filter(({ createdOn, updatedOn }) => createdOn || updatedOn)
      .sort(sortDate)
      .slice(0, 5)
      .map(({ title, group, ...rest }) => ({
        title: group ? `${group}: ${title}` : title,
        group,
        ...rest,
      }))
      .map(toDisplayPage),
  };
}
