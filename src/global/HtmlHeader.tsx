import React from "react";
import { Helmet } from "react-helmet";

const HtmlHeader: React.FunctionComponent<{}> = () => {
  return (
    <Helmet>
      <html lang="en" />
      <title>mattb.tech</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://use.typekit.net/ukk8ctr.css" />
    </Helmet>
  );
};
export default HtmlHeader;
