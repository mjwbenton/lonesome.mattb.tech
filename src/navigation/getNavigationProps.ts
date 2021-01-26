import { getAllPageMeta } from "../pageMeta";
import { Entry, Group, NavigationProps } from "./navigationTypes";

const NAVIGATION_ORDER = [
  "Photos",
  "Keyboards",
  "Playlists",
  "Reading",
  "Code",
];

export default async function getNavigationProps(): Promise<NavigationProps> {
  const allPosts = await getAllPageMeta();
  const orderedPosts = allPosts.sort((a, b) => (a.index || 0) - (b.index || 0));

  const entries = NAVIGATION_ORDER.map((groupOrEntryName) => {
    const groupNodes = orderedPosts.filter(
      (node) => node.group === groupOrEntryName
    );
    const entryNode = orderedPosts.find(
      (node) => node.title === groupOrEntryName
    );
    if (entryNode && groupNodes.length) {
      throw new Error(
        `Cannot have a group with the same name as an entry. Name: ${groupOrEntryName}`
      );
    }
    if (entryNode) {
      return {
        type: "entry",
        title: groupOrEntryName,
        slug: entryNode.slug!,
      } as Entry;
    } else {
      return {
        type: "group",
        title: groupOrEntryName,
        entries: groupNodes.map(
          (node) =>
            ({
              type: "entry",
              title: node.title!,
              slug: node.slug!,
            } as Entry)
        ),
      } as Group;
    }
  });

  return { entries };
}
