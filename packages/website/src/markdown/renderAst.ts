import React from "react";
import rehypeReact from "rehype-react";

export default new rehypeReact({
  createElement: React.createElement,
}).Compiler;
