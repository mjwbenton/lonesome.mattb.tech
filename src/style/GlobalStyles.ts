import { createGlobalStyle } from "styled-components";
import {
  fontColor,
  altBackgroundColor,
  backgroundColor,
  fontStack
} from "./style";

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

  kbd {
    border: 1px solid ${fontColor};
    background-color: ${altBackgroundColor};
    font-size: 0.8rem;
    border-radius: 3px;
    padding: 1px 1px;
  }
`;
