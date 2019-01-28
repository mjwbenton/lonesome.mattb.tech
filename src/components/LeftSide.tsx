import * as React from "react";
import Navigation from "./navigation/Navigation";

const LeftSide: React.SFC<{}> = ({ children }) => {
  return (
    <div className="mb-leftside">
      <a href="/" className="mb-leftside__logo">
        mattb
      </a>
      <Navigation />
    </div>
  );
};
export default LeftSide;
