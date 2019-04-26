import styled, { css } from "styled-components";
import { maxContentWidth, spacingUnit } from "../style/style";

export const maxWidthMixin = css`
  max-width: ${maxContentWidth};
  margin: 0 auto ${spacingUnit} auto;
`;

export const maxWidthTagFactory = tag =>
  styled(tag)`
    ${maxWidthMixin}
  `;

export default maxWidthTagFactory("div");
