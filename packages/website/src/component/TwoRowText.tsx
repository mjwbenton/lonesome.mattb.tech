import React from "react";

const TwoRowText = ({ row1, row2 }: { row1: string; row2: string }) => (
  <div>
    <h2 className="font-bold">{row1}</h2>
    <span className="italic">{row2}</span>
  </div>
);

export default TwoRowText;
