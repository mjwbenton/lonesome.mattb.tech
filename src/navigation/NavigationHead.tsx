import styled from "styled-components";
import { spacingUnit, fontColor } from "../style/style";

export default styled.a`
  display: block;
  cursor: pointer;
  margin-bottom: ${spacingUnit};
  color: ${fontColor};
  font-size: 1.25rem;
  font-weight: 700;

  &:last-child {
    margin-bottom: 0;
  }
`;
