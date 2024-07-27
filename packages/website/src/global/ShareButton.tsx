import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Share } from "react-feather";
import { NoShareMode } from "utils/isShareMode";

const SHARE_BASE = "https://share.mattb.tech";

export default function ShareButton({
  shareEnabled,
}: {
  shareEnabled?: boolean;
}) {
  const router = useRouter();
  const slug = router.asPath;

  return shareEnabled ? (
    <NoShareMode>
      <a
        className="absolute right-0 top-0 py-2 px-2 text-light-2 dark:text-dark-2"
        aria-label="Share"
        href={`${SHARE_BASE}${slug}`}
      >
        <Share />
      </a>
    </NoShareMode>
  ) : null;
}
