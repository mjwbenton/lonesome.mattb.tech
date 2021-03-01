import { getAllPageMeta } from "pageMeta";
import { compareDesc, formatISO } from "date-fns";

export interface Page {
  readonly createdOn: string | null;
  readonly updatedOn: string | null;
  readonly description: string | null;
  readonly title: string;
  readonly slug: string;
}

export default async function recentPagesDataProvider(): Promise<{
  recentPages: Page[];
}> {
  const allPageMeta = await getAllPageMeta();
  return {
    recentPages: allPageMeta
      .filter(
        ({ createdOn, updatedOn }) => createdOn !== null || updatedOn !== null
      )
      .sort((a, b) => {
        const aDate = a.updatedOn ?? a.createdOn;
        const bDate = b.updatedOn ?? b.createdOn;
        return compareDesc(aDate!, bDate!);
      })
      .slice(0, 5)
      .map(({ createdOn, updatedOn, description, title, slug }) => ({
        createdOn: createdOn
          ? formatISO(createdOn, { representation: "date" })
          : null,
        updatedOn: updatedOn
          ? formatISO(updatedOn, { representation: "date" })
          : null,
        description,
        title,
        slug,
      })),
  };
}
