export type Group = {
  type: "group";
  title: string;
  entries: Array<Entry>;
};

export type Entry = {
  type: "entry";
  title: string;
  slug: string;
};

export type NavigationProps = {
  entries: Array<Group | Entry>;
};
