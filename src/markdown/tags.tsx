import styled from "styled-components";
import { spacingUnit, maxContentWidth } from "../style/style";

export const ul = styled.ul`
  max-width: ${maxContentWidth};
  margin: 0 auto ${spacingUnit} auto;
  padding-left: ${spacingUnit};
`;

export const img = styled.img`
  max-width: 100%;
  max-height: 90vh;
`;

export const pre = styled.pre`
  && {
    max-width: ${maxContentWidth};
    margin: 0 auto ${spacingUnit} auto;
  }
`;

export const h2 = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  max-width: ${maxContentWidth};
  margin: 0 auto ${spacingUnit} auto;
`;

export const h3 = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  max-width: ${maxContentWidth};
  margin: 0 auto ${spacingUnit} auto;
`;
