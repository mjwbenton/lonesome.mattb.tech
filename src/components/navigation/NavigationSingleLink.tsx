import React from "react";
import { Node } from "./Node";
import { Link } from "gatsby";

const NavigationSingleLink: React.FunctionComponent<{ node: Node }> = ({
  node
}) => (
  <div key={node.fields.slug} className="mb-navigation__section">
    <Link to={node.fields.slug!} className="mb-navigation__label">
      {node.frontmatter.title}
    </Link>
  </div>
);
export default NavigationSingleLink;
