import React from "react";
import { Node } from "./Node";

const NavigationSingleLink: React.FunctionComponent<{ node: Node }> = ({
  node
}) => (
  <div key={node.fields.slug} className="mb-navigation__section">
    <a href={node.fields.slug} className="mb-navigation__label">
      {node.frontmatter.title}
    </a>
  </div>
);
export default NavigationSingleLink;
