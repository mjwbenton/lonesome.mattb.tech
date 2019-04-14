import React from "react";
import { graphql } from "gatsby";
import Layout from "../global/Layout";
import styled from "styled-components";
import {
  spacingUnit,
  maxContentWidth,
  altBackgroundColor
} from "../style/style";
import { Clock } from "react-feather";
import MarkdownContent from "../markdown/MarkdownContent";
import remark from "remark";
import remark2rehype from "remark-rehype";
import unified from "unified";

const RepoWrapper = styled.div`
  margin: ${spacingUnit} auto calc(${spacingUnit} * 2) auto;
  max-width: ${maxContentWidth};
  border-top: 3px solid ${altBackgroundColor};
`;

const RepoName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const Description = styled.p`
  margin-bottom: ${spacingUnit};
`;

const Readme = styled.div`
  margin-bottom: ${spacingUnit};
  font-size: 0.75rem;
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

const Infoline = styled.div`
  background-color: ${altBackgroundColor};
  display: flex;
  padding: 8px;
  width: 100%;
`;

const Ghlink = styled.a`
  font-size: 0.75rem;

  :after {
    content: "→";
  }
`;

const Info = styled.div`
  font-size: 0.75rem;
  flex: 1;
`;

/* TODO: Finish adding README
        {n.node.object && n.node.object.text && (
          <Readme>
            <MarkdownContent
              htmlAst={unified()
                .use(remark2rehype)
                .runSync(remark().parse(n.node.object.text))}
            />
          </Readme>
        )}
*/

const GithubPage: React.FunctionComponent<{ data: any }> = ({ data }) => (
  <Layout>
    <MarkdownContent htmlAst={data.markdownRemark.htmlAst} />
    {data.api.github.repositories.edges.map(n => (
      <RepoWrapper key={n.node.name}>
        <RepoName>{n.node.name}</RepoName>
        {n.node.description && <Description>{n.node.description}</Description>}
        <Timesline>
          <Created>
            Created: <Clock size={14} /> {n.node.createdAt}
          </Created>
          <Updated>
            Last Updated: <Clock size={14} /> {n.node.updatedAt}
          </Updated>
        </Timesline>
        <Infoline>
          <Info>
            {n.node.licenseInfo ? n.node.licenseInfo.name : "UNLICENSED"}
            {", "}
            {n.node.primaryLanguage ? n.node.primaryLanguage.name : "UNKNOWN"}
          </Info>
          <Ghlink href={n.node.url}>Gh</Ghlink>
        </Infoline>
      </RepoWrapper>
    ))}
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
