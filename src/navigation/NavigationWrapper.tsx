import styled from "styled-components";
import { spacingUnit, altBackgroundColor, fontColor } from "../style/style";

export default styled.div`
  background-color: ${altBackgroundColor};
  border-top: 1px dotted ${fontColor};
  padding: ${spacingUnit};
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
