import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import styled from "styled-components";
import { spacingUnit } from "../style/style";
import { Clock } from "react-feather";
import MarkdownContent from "../markdown/MarkdownContent";
import Infoline from "../component/Infoline";
import ContentBlock from "../component/ContentBlock";
import MaxWidthWrapper from "../component/MaxWidthWrapper";

const RepoName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const Description = styled.p`
  margin-bottom: ${spacingUnit};
`;

const Timesline = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.75rem;
  justify-content: space-between;
  margin-bottom: ${spacingUnit};
`;

const Created = styled.div`
  text-align: left;
`;

const Updated = styled.div`
  text-align: right;
`;

const GithubPage: React.FunctionComponent<{ data: any }> = ({ data }) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    <MaxWidthWrapper>
      {data.api.githubRepositories.map((n: any) => (
        <ContentBlock key={n.name}>
          <RepoName>{n.name}</RepoName>
          {n.description && <Description>{n.description}</Description>}
          <Timesline>
            <Created>
              Created: <Clock size={14} /> {n.createdAt}
            </Created>
            <Updated>
              Last Updated: <Clock size={14} /> {n.updatedAt}
            </Updated>
          </Timesline>
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
