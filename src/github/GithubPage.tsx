import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import styled from "styled-components";
import { spacingUnit } from "../style/style";
import { Clock } from "react-feather";
import MarkdownContent from "../markdown/MarkdownContent";
import Infoline from "../component/Infoline";
import Block from "../component/Block";
import MaxWidthWrapper from "../global/MaxWidthWrapper";

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
      {data.api.github.repositories.edges.map((n: any) => (
        <Block key={n.node.name}>
          <RepoName>{n.node.name}</RepoName>
          {n.node.description && (
            <Description>{n.node.description}</Description>
          )}
          <Timesline>
            <Created>
              Created: <Clock size={14} /> {n.node.createdAt}
            </Created>
            <Updated>
              Last Updated: <Clock size={14} /> {n.node.updatedAt}
            </Updated>
          </Timesline>
          <Infoline externalLinkUrl={n.node.url} externalLinkText="Gh">
            {n.node.licenseInfo ? n.node.licenseInfo.name : "UNLICENSED"}
            {", "}
            {n.node.primaryLanguage ? n.node.primaryLanguage.name : "UNKNOWN"}
          </Infoline>
        </Block>
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
      github {
        repositories(
          first: 100
          privacy: PUBLIC
          isFork: false
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          edges {
            node {
              name
              createdAt
              description
              licenseInfo {
                name
              }
              primaryLanguage {
                name
              }
              updatedAt
              url
              object(expression: "master:README.md") {
                ... on Api_Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GithubPage;
