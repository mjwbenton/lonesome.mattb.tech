import styled from "styled-components";
import { spacingUnit } from "../../style";

export default styled.div`
  background-color: #f7f7f7;
  border-top: 1px dotted #969696;
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
