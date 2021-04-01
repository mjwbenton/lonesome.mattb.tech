import client from "./client";

export default function contextBuilder() {
  return {
    client,
  };
}

export type Context = ReturnType<typeof contextBuilder>;
