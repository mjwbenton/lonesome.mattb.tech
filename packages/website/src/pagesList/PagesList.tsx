import EmbeddedWrapper from "component/EmbeddedWrapper";
import StripedList, { StripeElement } from "component/StripedList";
import TwoRowText from "component/TwoRowText";
import { usePageData } from "@mattb.tech/data-fetching";
import React from "react";
import { Clock } from "react-feather";

export interface Page {
  readonly createdOn: string | null;
  readonly updatedOn: string | null;
  readonly description: string;
  readonly title: string;
  readonly slug: string;
}

export default function PagesList({
  withIndex = false,
}: {
  withIndex?: boolean;
}) {
  const { pagesList } = usePageData();

  return (
    <EmbeddedWrapper>
      <StripedList>
        {pagesList.map(
          (
            { slug, description, title, createdOn, updatedOn }: Page,
            index: number,
          ) => (
            <StripeElement
              key={slug}
              index={withIndex ? index + 1 : undefined}
              href={slug}
            >
              <div>
                <TwoRowText row1={title} row2={description ?? ""} />
                <PageDate createdOn={createdOn} updatedOn={updatedOn} />
              </div>
            </StripeElement>
          ),
        )}
      </StripedList>
    </EmbeddedWrapper>
  );
}

function PageDate({
  updatedOn,
  createdOn,
}: {
  updatedOn: string | null;
  createdOn: string | null;
}) {
  const date = updatedOn ?? createdOn;
  if (!date) {
    return null;
  }
  const label = updatedOn ? "Updated" : "Created";
  return (
    <div className="mt-2 text-xs">
      {label}: <Clock className="inline -mt-0.5" size={11} /> {date}
    </div>
  );
}
