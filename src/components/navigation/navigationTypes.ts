export type Column = Array<Group | Entry>;

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
