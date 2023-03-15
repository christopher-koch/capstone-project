import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --base: #9b70ff;
  --base-light: #e8daff;
  --base-dark: #660087;
  --primary-highlight: #42ffc6;
  --secondary-highlight: #f7ffac;
  --white: #f6f6f6;
  --lightgray: #e2e2e2;
  --gray: #8b8b8b;
  --darkgray: #3e3e3e;
  --darkergray: #222222;
  --text: #111;
  --lightred: #ffdddf;
  --red: #de0051;
  --lightblue: #d4e0ff;
  --blue: #006dca;
  --lightgreen: #e5ffc3;
  --green: #5c9b00;
  --lightorange: #FFDFC6;
  --orange: #D57300;
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
    color: var(--base-dark)
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  a {
    color: var(--secondary-highlight)
  }
  
  h1 {
    color: var(--text);
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: 0.1rem;
    font-stretch: 75%;
    font-variation-settings: "ital" 5, "wdth" 125;
    font-variant: small-caps;
    padding-bottom: 2rem;
    > span {
      display: inline-block;
      padding: 0 0.2rem;
      background-color: var(--primary-highlight);
      transform:skew(-4deg)
    }
  }
  
  p {
    font-size: 1rem;
    font-weight: 400;
  }
  
  .main-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-width: 375px;
    padding: 20% 5%;
  }

  .link {
    text-align: center;
    width: 100%;
    padding: 2rem 0;
  }
  
  .active {
    background: var(--base-light);
  }
  
  .icon{
    font-size: 1.8rem;
    pointer-events: none;
  }

  .icon-active{
    color: var(--base);
    font-size: 1.8rem;
    pointer-events: none;
  }

.delete-container {
  margin-right: auto;
}

`;
