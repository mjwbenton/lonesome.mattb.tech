import React from "react";
import ContentBlock from "../component/ContentBlock";
import Infoline from "../component/Infoline";
import TwoRowText from "../component/TwoRowText";
import { Star, Clock } from "react-feather";

interface BookType {
  readonly title: string;
  readonly link: string;
  readonly rating: number | null;
  readonly image: string;
  readonly authors: ReadonlyArray<string>;
  readonly read: boolean;
  readonly started_at: string | null;
  readonly read_at: string | null;
}

const Book: React.FunctionComponent<{ book: BookType }> = ({ book }) => (
  <ContentBlock>
    <div className="flex">
      <img
        className="mr-2 object-cover"
        src={book.image}
        alt={`Cover of ${book.title}`}
      />
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
          Rating: <Star className="inline" size={14} /> {book!.rating}/5
        </span>
      ) : (
        <span>Still reading</span>
      )}
    </Infoline>
  </ContentBlock>
);

export default Book;
