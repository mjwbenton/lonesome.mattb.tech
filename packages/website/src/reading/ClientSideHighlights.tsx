import {
  BookHighlightsQuery,
  BookHighlightsQueryVariables,
} from "generated/graphql";
import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ErrorDisplay from "component/ErrorDisplay";
import Spinner from "component/Spinner";

const QUERY = gql`
  query BookHighlights($bookId: ID!) {
    book(id: $bookId) {
      title
      highlights(first: 100) {
        total
        items {
          text
          location
        }
      }
    }
  }
`;

const LoadBookHighlights = ({ bookId }: { bookId: string }) => {
  const { data, error } = useQuery<
    BookHighlightsQuery,
    BookHighlightsQueryVariables
  >(QUERY, {
    variables: { bookId },
  });
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data) {
    return <Spinner />;
  }
  if (!data.book) {
    return <ErrorDisplay error={new Error("Book not found")} />;
  }
  return (
    <>
      <h2>Highlights: {data.book.title}</h2>
      <div className="space-y-4">
        {data.book.highlights.items.map((highlight) => (
          <div key={highlight.location} className="italic">
            {highlight.text}
            <br />
            <span className="text-xs">
              &nbsp;---&nbsp;location&nbsp;{highlight.location}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

const ClientSidePhotosWithTag = () => {
  const router = useRouter();
  const bookId = router.query.bookId as string | undefined;
  return bookId ? <LoadBookHighlights bookId={bookId} /> : null;
};

export default ClientSidePhotosWithTag;
