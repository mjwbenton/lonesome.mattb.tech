import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";

const FORMAT_WITHOUT_TIME = "yyyy-MM-dd";
const FORMAT_WITH_TIME = "yyyy-MM-dd HH:mm";

export default function Date({
  children,
  showTime = false,
}: {
  children: string;
  showTime?: boolean;
}) {
  return (
    <>
      {format(
        parseISO(children),
        showTime ? FORMAT_WITH_TIME : FORMAT_WITHOUT_TIME,
      )}
    </>
  );
}
