import React from "react";
import rehypeReact from "rehype-react";
import Code, { Pre } from "./components/Code";

export default new rehypeReact({
  createElement: React.createElement,
  components: { code: Code, pre: Pre }
}).Compiler;
