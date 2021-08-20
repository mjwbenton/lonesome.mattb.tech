import React from "react";

const Infoline = ({
  externalLinkUrl,
  externalLinkText,
  children,
}: {
  externalLinkUrl?: string;
  externalLinkText?: string;
  children: any;
}) => (
  <div className="flex p-2 text-xs bg-light-1 dark:bg-dark-1">
    <div className="flex-1 inline">{children}</div>
    {externalLinkUrl ? (
      <a className="external-link" href={externalLinkUrl}>
        {externalLinkText}
      </a>
    ) : null}
  </div>
);

export default Infoline;
