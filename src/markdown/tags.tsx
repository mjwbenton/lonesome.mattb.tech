import React from "react";

type StyledIntrinsicProps<I extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[I],
  "className"
>;

export function p(props: StyledIntrinsicProps<"p">) {
  return <p {...props} className="text-justify max-width-block" />;
}

export function ul(props: StyledIntrinsicProps<"ul">) {
  return <ul {...props} className="pl-4 max-width-block" />;
}

export function li(props: StyledIntrinsicProps<"li">) {
  return <li {...props} className="list-disc list-outside" />;
}

export function img(props: StyledIntrinsicProps<"img">) {
  return <img {...props} className="w-full max-h-full" />;
}

export function pre(props: StyledIntrinsicProps<"pre">) {
  return <pre {...props} className="max-width-block" />;
}

export function h2(props: StyledIntrinsicProps<"h2">) {
  return <h2 {...props} className="text-lg font-bold max-width-block" />;
}

export function h3(props: StyledIntrinsicProps<"h3">) {
  return <h3 {...props} className="font-bold max-width-block" />;
}
