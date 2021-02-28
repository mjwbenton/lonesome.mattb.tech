import MaxWithWrapper from "component/MaxWidthWrapper";
import StripedList, { StripeElement } from "component/StripedList";
import TwoRowText from "component/TwoRowText";
import { usePageData } from "global/pageData";
import { PageMeta } from "pageMeta";
import React from "react";
import { Clock } from "react-feather";

export default function RecentPages() {
  const { recentPages } = usePageData();

  return (
    <MaxWithWrapper>
      <StripedList>
        {recentPages.map(
          (
            { slug, description, title, createdOn }: PageMeta,
            index: number
          ) => (
            <StripeElement key={slug} index={index} href={slug}>
              <div>
                <TwoRowText row1={title} row2={description ?? ""} />
                <div className="mt-2 text-xs">
                  Created: <Clock className="inline-block" size={14} />{" "}
                  {createdOn}
                </div>
              </div>
            </StripeElement>
          )
        )}
      </StripedList>
    </MaxWithWrapper>
  );
}
