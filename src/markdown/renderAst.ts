import React from "react";
import rehypeReact from "rehype-react";
import p from "./P";
import * as tags from "./tags";

export default new rehypeReact({
  createElement: React.createElement,
  components: {
    p,
    ...tags
  }
}).Compiler;
