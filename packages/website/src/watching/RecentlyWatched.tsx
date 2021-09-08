import React from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import Movie from "./Movie";
import { useRecentMovies } from "./recentMoviesDataProvider";
import Button from "component/Button";

const RecentlyRead: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useRecentMovies();
  if (!items) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      {items.map((movie, i) =>
        movie ? <Movie movie={movie} key={i} /> : null
      )}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </MaxWidthWrapper>
  );
};

export default RecentlyRead;
