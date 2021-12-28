import React from "react";
import EmbeddedWrapper from "../component/EmbeddedWrapper";
import Book from "./Book";
import { useRecentBooks } from "./recentBooksDataProvider";
import Button from "component/Button";

const RecentlyRead: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useRecentBooks();
  if (!items) {
    return null;
  }
  return (
    <EmbeddedWrapper>
      {items.map((book, i) => (book ? <Book book={book} key={i} /> : null))}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </EmbeddedWrapper>
  );
};

export default RecentlyRead;
