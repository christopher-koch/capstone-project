import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0
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

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .link {
    text-align: center;
    width: 100%;
    padding: 2rem 0;
  }

  .active {
    background-color: #f0f0f0;
  }

  .icon{
    font-size: 1.2rem;
    pointer-events: none;
  }

  .menu-active {
    background: #111;
  }

  .cool-button:hover {
    background: #000;
    color: #fff;
  }

  .cool-button {
    background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 2000% 2000%;

    -webkit-animation: rainbow 3s ease infinite;
    -z-animation: rainbow 3s ease infinite;
    -o-animation: rainbow 3s ease infinite;
    animation: rainbow 3s ease infinite;}

    @-webkit-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
  }
    @-moz-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
  }
    @-o-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 0%}
    100%{background-position:0% 82%}
  }
    @keyframes rainbow { 
    0%{background-position:0% 82%}
    50%{background-position:100% 0%}
    100%{background-position:0% 82%}
}

`;
