import React from "react";
import styled from "styled-components";
import { altBackgroundColor } from "../style/style";

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

const Wrapper = styled.li`
  list-style-type: none;
  :nth-child(even) {
    background-color: ${altBackgroundColor};
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`;

const Author = styled.span`
  font-style: italic;
`;

const Cover = styled.img``;

const Book: React.FunctionComponent<{ book: BookType }> = ({ book }) => (
  <Wrapper>
    <Title>{book.title}</Title>
    <Author>{book.authors.join(", ")}</Author>
    <Cover src={book.image} alt={`Cover of ${book.title}`} />
    {book.read && book.rating && <span>FINISHED! {book.rating}/5</span>}
    <span>{book.started_at}</span>
    {book.read_at && <span>{book.read_at}</span>}
  </Wrapper>
);

export default Book;
