import React from "react";
import styled from "styled-components";
import renderAst from "./renderAst";
import { spacingUnit } from "../style/style";

const Styled = styled.div`
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: ${spacingUnit};
  }
  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: calc(${spacingUnit} / 2);
  }
  p {
    max-width: 45rem;
    margin-bottom: ${spacingUnit};
    text-align: justify;
  }
  ul {
    max-width: 44rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  img {
    display: block;
    max-width: 96vw;
    max-height: 90vh;
  }
  pre {
    max-width: 45rem;
    margin-bottom: ${spacingUnit};
  }
`;

const MarkdownContent: React.FunctionComponent<{ htmlAst: any }> = ({
  htmlAst
}) => <Styled>{renderAst(htmlAst)}</Styled>;

export default MarkdownContent;
