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

const Cover = styled.img``;

const Wrapper = styled.div`
  display: flex;
  margin-top: ${halfSpacingUnit};
  margin-bottom: ${halfSpacingUnit};

  > * + * {
    margin: ${halfSpacingUnit};
  }
`;

const Timesline = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.75rem;
  justify-content: space-between;
  margin-bottom: ${halfSpacingUnit};
`;

const Book: React.FunctionComponent<{ book: BookType }> = ({ book }) => (
  <ContentBlock>
    <Wrapper>
      <Cover src={book.image} alt={`Cover of ${book.title}`} />
      <TwoRowText row1={book.title} row2={book.authors.join(", ")} />
    </Wrapper>
    <Timesline>
      <span>
        <Clock size={14} /> {book.started_at}
      </span>
      {book.read_at && (
        <span>
          <Clock size={14} /> {book.read_at}
        </span>
      )}
    </Timesline>
    <Infoline externalLinkUrl={book.link} externalLinkText="Gr">
      {book.read && book.rating && (
        <span>
          <Star size={14} /> {book.rating}/5
        </span>
      )}
    </Infoline>
  </ContentBlock>
);

export default Book;
