import { usePageData } from "@mattb.tech/data-fetching";
import Tile from "component/Tile";
import { YearCounts } from "./yearReviewDataProvider";

export default function CountTiles() {
  const { movies, books, tvSeasons, videoGames }: YearCounts = usePageData();

  return (
    <>
      <Tile>
        Watched <strong>{movies.watched}</strong> movies
      </Tile>
      <Tile>
        Finished <strong>{books.finished}</strong> books. <br />{" "}
        <span className="text-xs">
          Started {books.started}, gave up on {books.gaveUp}.
        </span>
      </Tile>
      <Tile>
        Completed <strong>{videoGames.completed}</strong> video games. <br />{" "}
        <span className="text-xs">
          Started {videoGames.started}, gave up on {videoGames.gaveUp}.
        </span>
      </Tile>
      <Tile>
        Finished <strong>{tvSeasons.finished}</strong> seasons of TV. <br />{" "}
        <span className="text-xs">
          Started {tvSeasons.started}, gave up on {tvSeasons.gaveUp}.
        </span>
      </Tile>
    </>
  );
}
