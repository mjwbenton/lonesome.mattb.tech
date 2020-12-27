import React from "react";
import rehypeReact from "rehype-react";
import * as tags from "./tags";

export default new rehypeReact({
  createElement: React.createElement,
  components: tags,
}).Compiler;
