import MaxWithWrapper from "component/MaxWidthWrapper";
import StripedList, { StripeElement } from "component/StripedList";
import TwoRowText from "component/TwoRowText";
import { usePageData } from "global/pageData";
import React from "react";
import { Clock } from "react-feather";
import { Page } from "./recentPagesDataProvider";

export default function RecentPages() {
  const { recentPages } = usePageData();

  return (
    <MaxWithWrapper>
      <StripedList>
        {recentPages.map(
          (
            { slug, description, title, createdOn, updatedOn }: Page,
            index: number
          ) => (
            <StripeElement key={slug} index={index} href={slug}>
              <div>
                <TwoRowText row1={title} row2={description ?? ""} />
                <PageDate createdOn={createdOn} updatedOn={updatedOn} />
              </div>
            </StripeElement>
          )
        )}
      </StripedList>
    </MaxWithWrapper>
  );
}

function PageDate({
  updatedOn,
  createdOn,
}: {
  updatedOn: string | null;
  createdOn: string | null;
}) {
  const label = updatedOn ? "Updated" : "Created";
  const date = updatedOn ?? createdOn;
  return (
    <div className="mt-2 text-xs">
      {label}: <Clock className="inline -mt-0.5" size={11} /> {date}
    </div>
  );
}
