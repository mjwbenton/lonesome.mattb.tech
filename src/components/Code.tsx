import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Test from "./Test";

const Code: React.FunctionComponent<{
  children: Array<string>;
  className: string;
}> = ({ children, className }) => {
  if (className === "language-jsx") {
    return (
      <LiveProvider scope={{ Test }} code={children[0]}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    return <code>{children[0]}</code>;
  }
};

export const Pre = props => {
  if (
    props.children[0] &&
    props.children[0].props &&
    props.children[0].props.className === "language-jsx"
  ) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};

export default Code;
