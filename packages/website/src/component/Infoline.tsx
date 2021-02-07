import React from "react";

export default ({ externalLinkUrl, externalLinkText, children }) => (
  <div className="flex p-2 text-xs bg-gray">
    <div className="flex-1 inline">{children}</div>
    <a className="external-link" href={externalLinkUrl}>
      {externalLinkText}
    </a>
  </div>
);
