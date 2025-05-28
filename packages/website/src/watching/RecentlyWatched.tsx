import React from "react";
import EmbeddedWrapper from "../component/EmbeddedWrapper";
import { Feature, TvSeries } from "./display";
import { useWatching } from "./watchingDataProvider";
import Button from "component/Button";
import { TopRightSpinner } from "component/Spinner";

const RecentlyWatched: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useWatching();
  if (!items) {
    return null;
  }
  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      {items.map((item, i) =>
        item?.__typename === "Feature" ? (
          <Feature feature={item} key={item.id} />
        ) : item?.__typename === "TvSeries" ? (
          <TvSeries tvSeries={item} key={item.id} />
        ) : null,
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
