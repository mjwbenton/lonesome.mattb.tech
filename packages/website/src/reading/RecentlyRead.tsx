import { RecentBooksQuery } from "generated/graphql";
import { usePageData } from "@mattb.tech/data-fetching";
import React from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import Book from "./Book";

const RecentlyRead: React.FunctionComponent = () => {
  const { recentBooks }: RecentBooksQuery = usePageData();
  if (!recentBooks) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      {recentBooks.map((book, i) =>
        book ? <Book book={book} key={i} /> : null
      )}
    </MaxWidthWrapper>
  );
};

export default RecentlyRead;
