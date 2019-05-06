import styled from "styled-components";
import { spacingUnit } from "../style/style";
import { maxWidthMixin } from "../component/MaxWidthWrapper";

export const ul = styled.ul`
  ${maxWidthMixin}
  padding-left: ${spacingUnit};
`;

export const img = styled.img`
  max-width: 100%;
  max-height: 90vh;
`;

export const pre = styled.pre`
  && {
    ${maxWidthMixin}
  }
`;

export const h2 = styled.h2`
  ${maxWidthMixin}
  font-size: 1.1rem;
  font-weight: 700;
`;

export const h3 = styled.h3`
  ${maxWidthMixin}
  font-size: 1rem;
  font-weight: 700;
`;
