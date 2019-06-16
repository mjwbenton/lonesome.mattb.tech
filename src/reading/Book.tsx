import React from "react";
import styled from "styled-components";
import ContentBlock from "../component/ContentBlock";
import Infoline from "../component/Infoline";
import TwoRowText from "../component/TwoRowText";
import { halfSpacingUnit, spacingUnit } from "../style/style";
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

const Wrapper = styled.div`
  display: flex;
  margin-top: ${halfSpacingUnit};
  margin-bottom: ${halfSpacingUnit};

  > * + * {
    margin: ${halfSpacingUnit};
  }
`;

const Time = styled.div`
  font-size: 0.75rem;
`;

const Book: React.FunctionComponent<{ book: BookType }> = ({ book }) => (
  <ContentBlock>
    <Wrapper>
      <img src={book.image} alt={`Cover of ${book.title}`} />
      <div>
        <TwoRowText row1={book.title} row2={book.authors.join(", ")} />
        {book.started_at && (
          <Time>
            Started: <Clock size={14} /> {book.started_at}
          </Time>
        )}
        {book.read_at && (
          <Time>
            Finished: <Clock size={14} /> {book.read_at}
          </Time>
        )}
      </div>
    </Wrapper>
    <Infoline externalLinkUrl={book.link} externalLinkText="Gr">
      {book.read ? (
        <span>
          Rating: <Star size={14} /> {book.rating}/5
        </span>
      ) : (
        <span>Still reading</span>
      )}
    </Infoline>
  </ContentBlock>
);

export default Book;
