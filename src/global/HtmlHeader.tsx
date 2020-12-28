import React from "react";
import { Helmet } from "react-helmet";

const HtmlHeader: React.FunctionComponent<{}> = () => {
  return (
    <Helmet>
      <html lang="en" />
      <title>mattb.tech</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};
export default HtmlHeader;
