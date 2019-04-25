import React from "react";

export type RecentBooks = {
  recentBooks: Array<{
    title: string;
    link: string;
    rating: number;
    image: string;
    authors: Array<string>;
    read: boolean;
    started_at: string;
    read_at: string;
  }>;
};

const RecentlyRead: React.FunctionComponent<RecentBooks> = ({
  recentBooks
}) => (
  <ul>
    {recentBooks.map(book => (
      <li>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </li>
    ))}
  </ul>
);

export default RecentlyRead;
