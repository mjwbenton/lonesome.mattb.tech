import styled from "styled-components";
import React from "react";
import { spacingUnit, maxContentWidth } from "../style/style";

const TextP = styled.p`
  max-width: ${maxContentWidth};
  margin: 0 auto ${spacingUnit} auto;
  text-align: justify;
`;

const ImgP = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: ${spacingUnit};
`;

function hasImgChild(props: any): boolean {
  return (
    props.children &&
    props.children[0].type &&
    props.children[0].type.target == "img"
  );
}

export default (props: any) =>
  hasImgChild(props) ? <ImgP {...props} /> : <TextP {...props} />;
