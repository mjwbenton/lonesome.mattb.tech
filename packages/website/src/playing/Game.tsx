import React from "react";
import ContentBlock from "../component/ContentBlock";
import Infoline from "../component/Infoline";
import TwoRowText from "../component/TwoRowText";
import Date from "../component/Date";
import { Star, Clock } from "react-feather";
import { VideoGameFragment } from "../generated/graphql";

const PLAYING_SHELF_ID = "Playing";

const Game: React.FunctionComponent<{ game: VideoGameFragment }> = ({
  game,
}) => (
  <ContentBlock>
    <div className="flex">
      {game.image ? (
        <img
          className="mr-2 object-cover"
          src={game.image.url}
          alt={`Cover of ${game.title}`}
        />
      ) : null}
      <div className="my-2 space-y-2">
        <TwoRowText
          row1={game.title}
          row2={game.platforms?.map(({ name }) => name).join(", ") ?? ""}
        />
        {game.addedAt ? (
          <div className="text-xs">
            Started: <Clock className="inline" size={14} />{" "}
            <Date>{game.addedAt}</Date>
          </div>
        ) : null}
        {game.shelf.id !== PLAYING_SHELF_ID ? (
          <div className="text-xs">
            {game.shelf.name}: <Clock className="inline" size={14} />{" "}
            <Date>{game.movedAt}</Date>
          </div>
        ) : null}
        {game.notes ? <div className="text-xs">{game.notes}</div> : null}
      </div>
    </div>
    <Infoline>
      <span>
        <>{game.shelf.name} </>
        {game.rating ? (
          <>
            <Star className="inline" size={14} /> {game.rating}/10
          </>
        ) : null}
      </span>
    </Infoline>
  </ContentBlock>
);

export default Game;
