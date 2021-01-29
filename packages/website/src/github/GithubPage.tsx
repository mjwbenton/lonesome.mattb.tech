import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import { Clock } from "react-feather";
import MarkdownContent from "../markdown/MarkdownContent";
import Infoline from "../component/Infoline";
import ContentBlock from "../component/ContentBlock";
import MaxWidthWrapper from "../component/MaxWidthWrapper";

const GithubPage: React.FunctionComponent<{ data: any }> = ({ data }) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <MaxWidthWrapper>
      {data.api.githubRepositories.map((n: any) => (
        <ContentBlock key={n.name}>
          <div className="text-lg font-bold">{n.name}</div>
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
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      htmlAst
    }
    api {
      githubRepositories {
        name
        url
        createdAt
        updatedAt
        description
        license
        primaryLanguage
        readme
      }
    }
  }
`;

export default GithubPage;
