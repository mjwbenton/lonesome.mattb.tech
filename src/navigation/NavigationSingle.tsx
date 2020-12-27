import React from "react";
import { Entry } from "./navigationTypes";
import { Link } from "gatsby";

const NavigationSingle: React.FunctionComponent<Entry> = ({ title, slug }) => (
  <Link
    className="block text-xl font-bold text-gray-800 no-underline cursor-pointer visited:text-gray-800"
    to={slug}
  >
    {title}
  </Link>
);
export default NavigationSingle;
