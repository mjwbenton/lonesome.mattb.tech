import React from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import Book from "./Book";
import { useRecentBooks } from "./recentBooksDataProvider";
import Button from "component/Button";

const RecentlyRead: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useRecentBooks();
  if (!items) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      {items.map((book, i) => (book ? <Book book={book} key={i} /> : null))}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </MaxWidthWrapper>
  );
};

export default RecentlyRead;
