import React from "react";

export default ({ row1, row2 }: { row1: string; row2: string }) => (
  <div>
    <h3 className="font-bold">{row1}</h3>
    <span className="italic">{row2}</span>
  </div>
);
