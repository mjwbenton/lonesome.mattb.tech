import React from "react";
import Icon from "./Icon";
import { Share } from "react-feather";

const Infoline = ({
  externalLinkUrl,
  externalLinkText,
  shareUrl,
  children,
}: {
  externalLinkUrl?: string;
  externalLinkText?: string;
  shareUrl?: string;
  children: any;
}) => (
  <div className="flex p-2 text-xs bg-light-1 dark:bg-dark-1 max-w-[100vw]">
    <div className="flex-1 min-w-0">{children}</div>
    {shareUrl ? (
      <a className="flex-none pr-2" href={shareUrl}>
        Sh <Icon component={Share} size="xsmall" />
      </a>
    ) : null}
    {externalLinkUrl ? (
      <a className="flex-none external-link" href={externalLinkUrl}>
        {externalLinkText}
      </a>
    ) : null}
  </div>
);

export default Infoline;
