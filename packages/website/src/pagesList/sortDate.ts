import { compareDesc } from "date-fns/compareDesc";
import { PageMeta } from "pageMeta";

const NEWEST_DATE = new Date();

export default function sortDate(a: PageMeta, b: PageMeta) {
  const aDate = a.updatedOn ?? a.createdOn ?? NEWEST_DATE;
  const bDate = b.updatedOn ?? b.createdOn ?? NEWEST_DATE;
  return compareDesc(aDate, bDate);
}
