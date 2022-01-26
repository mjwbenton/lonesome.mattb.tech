import React from "react";
import EmbeddedWrapper from "../component/EmbeddedWrapper";
import { useRecentGames } from "./recentGamesDataProvider";
import Button from "component/Button";
import Game from "./Game";
import { TopRightSpinner } from "component/Spinner";

const RecentlyPlayed: React.FunctionComponent = () => {
  const { items, hasNextPage, loadNextPage, loading } = useRecentGames();
  if (!items) {
    return null;
  }
  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      {items.map((game, i) => (game ? <Game game={game} key={i} /> : null))}
      {hasNextPage ? (
        <Button disabled={loading} onClick={loadNextPage}>
          Load More
        </Button>
      ) : null}
    </EmbeddedWrapper>
  );
};

export default RecentlyPlayed;
