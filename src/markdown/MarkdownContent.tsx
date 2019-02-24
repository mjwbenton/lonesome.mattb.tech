import React from "react";
import styled from "styled-components";
import renderAst from "./renderAst";
import { spacingUnit } from "../style/style";

const MarkdownContent: React.FunctionComponent<{ htmlAst: any }> = ({
  htmlAst
}) => <div>{renderAst(htmlAst)}</div>;

export default MarkdownContent;
