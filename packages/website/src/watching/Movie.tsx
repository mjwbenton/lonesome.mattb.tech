import React from "react";
import ContentBlock from "../component/ContentBlock";
import Infoline from "../component/Infoline";
import TwoRowText from "../component/TwoRowText";
import Date from "../component/Date";
import { Star, Clock } from "react-feather";
import { MovieFragment } from "../generated/graphql";

const Movie: React.FunctionComponent<{ movie: MovieFragment }> = ({
  movie,
}) => (
  <ContentBlock>
    <div className="flex">
      {movie.image ? (
        <img
          className="mr-2 object-cover"
          src={movie.image.url}
          alt={`Poster for ${movie.title}`}
        />
      ) : null}
      <div className="my-2 space-y-2">
        <TwoRowText row1={movie.title} row2={movie.releaseYear} />
        <div className="text-xs">
          Watched: <Clock className="inline" size={14} />{" "}
          <Date>{movie.movedAt}</Date>
        </div>
        {movie.notes ? <div className="text-xs">{movie.notes}</div> : null}
      </div>
    </div>
    <Infoline>
      <span>
        {movie.rating ? (
          <>
            <Star className="inline" size={14} /> {movie.rating}/10
          </>
        ) : (
          <>No Rating</>
        )}
      </span>
    </Infoline>
  </ContentBlock>
);

export default Movie;
