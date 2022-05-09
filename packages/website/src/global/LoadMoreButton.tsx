import Button from "component/Button";
import React from "react";

type Data = {
  page:
    | {
        hasNextPage: boolean;
        nextPageCursor: string | null | undefined;
      }
    | null
    | undefined;
};

export default function LoadMoreButton({
  data,
  loading,
  fetchMore,
}: {
  data: Data | undefined;
  loading: boolean;
  fetchMore: (options: {
    variables: { after: string | null | undefined };
  }) => void;
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
