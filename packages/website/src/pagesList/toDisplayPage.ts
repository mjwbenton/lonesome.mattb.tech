import { formatISO } from "date-fns/formatISO";
import { PageMeta } from "pageMeta";

export default function toDisplayPage(p: PageMeta) {
  const { createdOn, updatedOn, description, title, slug } = p;
  return {
    createdOn: createdOn
      ? formatISO(createdOn, { representation: "date" })
      : null,
    updatedOn: updatedOn
      ? formatISO(updatedOn, { representation: "date" })
      : null,
    description,
    title,
    slug,
  };
}
