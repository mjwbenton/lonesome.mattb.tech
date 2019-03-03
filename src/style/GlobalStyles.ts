import { createGlobalStyle } from "styled-components";
import { fontColor, backgroundColor, fontStack } from "./style";

export default createGlobalStyle`
  html {
    background-color: #fff;
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  html,
  body,
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${fontStack};
    font-size: 20px;
    color: ${fontColor};
    background-color: ${backgroundColor};
  }
  
  a {
    text-decoration: none;
  }
`;
