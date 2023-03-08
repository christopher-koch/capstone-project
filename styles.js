import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
