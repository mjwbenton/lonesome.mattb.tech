import { PageMeta } from "pageMeta";

export default function appendGroupToTitle({
  title,
  group,
  ...rest
}: PageMeta): PageMeta {
  return {
    title: group ? `${group}: ${title}` : title,
    group,
    ...rest,
  };
}
