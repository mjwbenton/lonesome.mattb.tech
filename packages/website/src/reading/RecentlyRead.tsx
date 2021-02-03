import { usePageData } from "global/pageData";
import React from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import Book, { BookType } from "./Book";

export type RecentBooks = {
  recentBooks: Array<BookType>;
};

const RecentlyRead: React.FunctionComponent<RecentBooks> = () => {
  const { recentBooks } = usePageData();
  return (
    <MaxWidthWrapper>
      {recentBooks && recentBooks.map((book) => <Book book={book} />)}
    </MaxWidthWrapper>
  );
};

export default RecentlyRead;
