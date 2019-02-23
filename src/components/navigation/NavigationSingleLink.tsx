import React from "react";
import { Node } from "./Node";
import { Link } from "gatsby";
import NavigationHead from "./NavigationHead";

const NavigationHeadLink = props => <NavigationHead as={Link} {...props} />;

const NavigationSingleLink: React.FunctionComponent<{ node: Node }> = ({
  node
}) => (
  <NavigationHeadLink to={node.fields.slug!}>
    {node.frontmatter.title}
  </NavigationHeadLink>
);
export default NavigationSingleLink;
