import React from "react";
import { Entry } from "./navigationTypes";
import { Link } from "gatsby";
import NavigationHead from "./NavigationHead";

const NavigationHeadLink = props => <NavigationHead as={Link} {...props} />;

const NavigationSingle: React.FunctionComponent<Entry> = ({ title, slug }) => (
  <NavigationHeadLink to={slug}>{title}</NavigationHeadLink>
);
export default NavigationSingle;
