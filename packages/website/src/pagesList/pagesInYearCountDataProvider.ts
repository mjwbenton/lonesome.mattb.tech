import { DataProvider } from "@mattb.tech/data-fetching";
import { getAllPageMeta } from "pageMeta";
import { getYear } from "date-fns/getYear";
import { startOfYear } from "date-fns/startOfYear";
import { isAfter } from "date-fns/isAfter";
import { isBefore } from "date-fns/isBefore";
import { addYears } from "date-fns/addYears";
import { subYears } from "date-fns/subYears";
import { endOfYear } from "date-fns/endOfYear";

const pagesInYearCountDataProvider: DataProvider<
  { filterYear: number },
  { filterYearPagesCount: number; previousYearPagesCount: number }
> = async ({ filterYear }) => {
  const allPageMeta = await getAllPageMeta();
  const startDate = endOfYear(new Date().setFullYear(filterYear - 1));
  const isCurrentYear = getYear(new Date()) === filterYear;
  const endDate = isCurrentYear
    ? new Date()
    : startOfYear(addYears(startDate, 2));
  return {
    filterYearPagesCount: allPageMeta.filter(
      ({ createdOn }) =>
        createdOn &&
        isAfter(createdOn, startDate) &&
        isBefore(createdOn, endDate),
    ).length,
    previousYearPagesCount: allPageMeta.filter(
      ({ createdOn }) =>
        createdOn &&
        isAfter(createdOn, subYears(startDate, 1)) &&
        isBefore(createdOn, subYears(endDate, 1)),
    ).length,
  };
};

export default pagesInYearCountDataProvider;
