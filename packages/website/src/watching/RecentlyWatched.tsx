import React from "react";
import EmbeddedWrapper from "../component/EmbeddedWrapper";
import { Movie, TvSeries } from "./display";
import { useWatching } from "./watchingDataProvider";
import Button from "component/Button";
import { MovieFragment, TvSeriesFragment } from "generated/graphql";

const RecentlyWatched: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useWatching();
  if (!items) {
    return null;
  }
  return (
    <EmbeddedWrapper>
      {items.map((item, i) =>
        item?.__typename === "Movie" ? (
          <Movie movie={item} key={item.id} />
        ) : item?.__typename === "TvSeries" ? (
          <TvSeries tvSeries={item} key={item.id} />
        ) : null
      )}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </EmbeddedWrapper>
  );
};

export default RecentlyWatched;
