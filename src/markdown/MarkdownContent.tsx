import React from "react";
import renderAst from "./renderAst";

const MarkdownContent: React.FunctionComponent<{ htmlAst: any }> = ({
  htmlAst,
}) => <div className="prose">{renderAst(htmlAst)}</div>;

export default MarkdownContent;
