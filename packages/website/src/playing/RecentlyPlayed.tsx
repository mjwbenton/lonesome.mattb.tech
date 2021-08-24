import React from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import { useRecentGames } from "./recentGamesDataProvider";
import Button from "component/Button";
import Game from "./Game";

const RecentlyPlayed: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useRecentGames();
  if (!items) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      {items.map((game, i) => (game ? <Game game={game} key={i} /> : null))}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </MaxWidthWrapper>
  );
};

export default RecentlyPlayed;
