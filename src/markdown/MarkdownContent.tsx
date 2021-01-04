import React from "react";
import renderAst from "./renderAst";
import Prose from "../component/Prose";

const MarkdownContent: React.FunctionComponent<{ htmlAst: any }> = ({
  htmlAst,
}) => <Prose>{renderAst(htmlAst)}</Prose>;

export default MarkdownContent;
