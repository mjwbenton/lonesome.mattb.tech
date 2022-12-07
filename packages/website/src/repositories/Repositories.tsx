import ContentBlock from "component/ContentBlock";
import ErrorDisplay from "component/ErrorDisplay";
import Infoline from "component/Infoline";
import EmbeddedWrapper from "component/EmbeddedWrapper";
import LoadMoreButton from "global/LoadMoreButton";
import React from "react";
import { Clock } from "react-feather";
import { useRepositories } from "./repositoriesDataProvider";
import Spinner from "component/Spinner";

export default function Repositories() {
  const { data, loading, error, fetchMore } = useRepositories();
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  if (!data?.page) {
    return <Spinner />;
  }
  return (
    <EmbeddedWrapper>
      <p className="mb-8">
        <b>{data.page.total}</b> total repositories
      </p>
      {data.page.items.map((n) => (
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
      <LoadMoreButton data={data} fetchMore={fetchMore} loading={loading} />
    </EmbeddedWrapper>
  );
}
