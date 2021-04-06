import { ObservableQueryFields } from "@apollo/client";
import Button from "component/Button";
import React from "react";

type Data = {
  page: { hasNextPage: boolean; nextPageCursor: string | null } | null;
};

export default function LoadMoreButton({
  data,
  loading,
  fetchMore,
}: {
  data: Data | undefined;
  loading: boolean;
  fetchMore: ObservableQueryFields<Data, { after: string }>["fetchMore"];
}) {
  if (!data?.page) {
    return null;
  }
  return data.page.hasNextPage ? (
    <Button
      disabled={loading}
      data-testid="load-more-button"
      onClick={() => {
        fetchMore({
          variables: {
            after: data.page?.nextPageCursor,
          },
        });
      }}
    >
      Load More
    </Button>
  ) : null;
}
