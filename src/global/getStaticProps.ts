import { GetStaticPropsContext } from "next";
import getNavigationProps from "../navigation/getNavigationProps";

export async function getStaticProps(_: GetStaticPropsContext) {
  return {
    props: {
      navigation: await getNavigationProps(),
    },
  };
}
