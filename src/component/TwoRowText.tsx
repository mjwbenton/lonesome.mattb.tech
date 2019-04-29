import React from "react";
import styled from "styled-components";

const Row1 = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`;

const Row2 = styled.span`
  font-style: italic;
`;

const Box = styled.div``;

export default ({ row1, row2 }: { row1: string; row2: string }) => (
  <Box>
    <Row1>{row1}</Row1>
    <Row2>{row2}</Row2>
  </Box>
);
