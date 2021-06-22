import path from "path";
import fs from "fs";
import { promisify } from "util";
import matter from "gray-matter";
import globby from "globby";
import { parseISO } from "date-fns";

const readFile = promisify(fs.readFile);

const rootPath = path.join(process.cwd(), "pages");

export interface PageMeta {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly group?: string;
  readonly createdOn?: Date;
  readonly updatedOn?: Date;
  readonly data?: any;
}

export async function getPageMeta(pagePath: string): Promise<PageMeta> {
  const rawContent = (await readFile(path.join(rootPath, pagePath))).toString();
  const { data } = matter(rawContent);
  const { group, title, createdOn, updatedOn, description, ...rest } = data;

  if (!(title && description)) {
    throw new Error(
      `Page missing required field title or description: ${JSON.stringify(
        data
      )}`
    );
  }

  return {
    title,
    slug: pagePath.replace(".mdx", "").replace("index", ""),
    group: group ?? null,
    description: description ?? null,
    createdOn: createdOn ? parseISO(createdOn) : undefined,
    updatedOn: updatedOn ? parseISO(updatedOn) : undefined,
    data: { ...rest },
  };
}

export async function listAllPages(): Promise<Array<string>> {
  return (await globby(rootPath, { expandDirectories: true }))
    .map((page) => "/".concat(path.relative(rootPath, page)))
    .filter((page) => page.endsWith(".mdx"));
}

export async function getAllPageMeta(): Promise<Array<PageMeta>> {
  const allPages = await listAllPages();
  return Promise.all(allPages.map((page) => getPageMeta(page)));
}
