import ContentBlock from "component/ContentBlock";
import Infoline from "component/Infoline";
import MaxWidthWrapper from "component/MaxWidthWrapper";
import { GithubRepositoriesQuery } from "generated/graphql";
import { usePageData } from "global/pageData";
import React from "react";
import { Clock } from "react-feather";

export default function Repositories() {
  const { githubRepositories }: GithubRepositoriesQuery = usePageData();
  if (!githubRepositories) {
    return null;
  }
  return (
    <MaxWidthWrapper>
      {githubRepositories.map((n: any) => (
        <ContentBlock key={n.name}>
          <h2 className="text-lg font-bold">{n.name}</h2>
          {n.description && <p className="mb-4">{n.description}</p>}
          <div className="flex justify-between w-full mb-4 text-xs">
            <div className="text-left">
              Created: <Clock className="inline-block" size={14} />{" "}
              {n.createdAt}
            </div>
            <div className="text-right">
              Last Updated: <Clock className="inline-block" size={14} />{" "}
              {n.updatedAt}
            </div>
          </div>
          <Infoline externalLinkUrl={n.url} externalLinkText="Gh">
            {n.license || "UNLICENSED"}
            {", "}
            {n.primaryLanguage || "UNKNOWN"}
          </Infoline>
        </ContentBlock>
      ))}
    </MaxWidthWrapper>
  );
}
