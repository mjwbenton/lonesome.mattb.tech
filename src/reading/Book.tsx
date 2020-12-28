import React from "react";
import ContentBlock from "../component/ContentBlock";
import Infoline from "../component/Infoline";
import TwoRowText from "../component/TwoRowText";
import { Star, Clock } from "react-feather";

export type BookType = {
  title: string;
  link: string;
  rating: number;
  image: string;
  authors: Array<string>;
  read: boolean;
  started_at: string;
  read_at: string;
};

const Book: React.FunctionComponent<{ book: BookType }> = ({ book }) => (
  <ContentBlock>
    <div className="flex">
      <img className="mr-2" src={book.image} alt={`Cover of ${book.title}`} />
      <div className="my-2 space-y-2">
        <TwoRowText row1={book.title} row2={book.authors.join(", ")} />
        {book.started_at && (
          <div className="text-xs">
            Started: <Clock className="inline" size={14} /> {book.started_at}
          </div>
        )}
        {book.read_at && (
          <div className="text-xs">
            Finished: <Clock className="inline" size={14} /> {book.read_at}
          </div>
        )}
      </div>
    </div>
    <Infoline externalLinkUrl={book.link} externalLinkText="Gr">
      {book.read ? (
        <span>
          Rating: <Star className="inline" size={14} /> {book.rating}/5
        </span>
      ) : (
        <span>Still reading</span>
      )}
    </Infoline>
  </ContentBlock>
);

export default Book;
