import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const Code: React.FunctionComponent<{
  children: Array<string>;
  className: string;
}> = ({ children, className }) => {
  if (className === "language-jsx") {
    return (
      <LiveProvider code={children[0]}>
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
  return <pre {...props} />;
};

export default Code;
