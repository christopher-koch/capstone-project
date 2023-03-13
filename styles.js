import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --base: #a7dbd8;
  --crust: #181926;
  --mantle: #1e2030;
  --rosewater: #f4dbd6;
  --text: #111;
  --lavender: #b7bdf8;
}

@font-face {
  font-family: 'Mona Sans';
  src:
    url('next/font/local/Mona-Sans.woff2') format('woff2 supports variations'),
    url('next/font/local/Mona-Sans.woff2') format('woff2-variations');
  font-weight: 200 900;
  font-stretch: 75% 125%;
}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    margin: 0;
    padding: 0;
    font-family: 'Mona Sans';
    background-color: var(--base);
    color: var(--text)
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 375px;
    padding: 10% 5%;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  section {
    display: flex;
    gap: 1rem;
  }

  a {
    color: var(--rosewater)
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    font-stretch: 75%;
    font-variation-settings: "ital" 5, "wdth" 125;
    padding-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    font-weight: 300;
  }

  .link {
    text-align: center;
    width: 100%;
    padding: 2rem 0;
  }

  .active {
    background: var(--mantle);
  }

  .icon{
    font-size: 1.8rem;
    pointer-events: none;
  }

`;
