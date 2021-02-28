import { getAllPageMeta, PageMeta } from "pageMeta";

export default async function recentPagesDataProvider(): Promise<{
  recentPages: PageMeta[];
}> {
  const allPageMeta = await getAllPageMeta();
  return {
    recentPages: allPageMeta.filter(({ createdOn }) => createdOn !== null),
  };
}
