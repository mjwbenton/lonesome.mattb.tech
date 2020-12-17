import React from "react";

function TextP(props: Omit<JSX.IntrinsicElements["p"], "className">) {
  return <p {...props} className="text-justify max-width-block" />;
}

function ImgP(props: Omit<JSX.IntrinsicElements["p"], "className">) {
  return <p {...props} className="max-w-full mb-4 text-center" />;
}

function hasImgChild(props: any): boolean {
  return (
    props.children &&
    props.children[0].type &&
    props.children[0].type.target == "img"
  );
}

export default (props: any) =>
  hasImgChild(props) ? <ImgP {...props} /> : <TextP {...props} />;
