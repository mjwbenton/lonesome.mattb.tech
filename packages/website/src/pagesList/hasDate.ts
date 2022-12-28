import { PageMeta } from "pageMeta";

export default function hasDate(page: PageMeta): boolean {
  return Boolean(page.createdOn || page.updatedOn);
}
