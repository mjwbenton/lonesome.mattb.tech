import { createGlobalStyle } from "styled-components";
import { fontColor } from "./style";

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
    font-family: "fira-sans", Arial, sans-serif;
    font-size: 20px;
    color: ${fontColor};
  }
  
  a {
    text-decoration: none;
  }
`;
