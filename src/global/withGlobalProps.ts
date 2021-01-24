import { GetStaticPropsContext } from "next";
import getNavigationProps from "../navigation/getNavigationProps";

export default async function withGlobalProps(_: GetStaticPropsContext) {
  return {
    navigation: await getNavigationProps(),
  };
}
