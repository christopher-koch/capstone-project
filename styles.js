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
  --lightyellow: #FFF9E5;
  --yellow: #FFE53E;
}

/* @font-face {
  font-family: 'Mona Sans';
  src:
    url('next/font/local/Mona-Sans.woff2') format('woff2 supports variations'),
    url('next/font/local/Mona-Sans.woff2') format('woff2-variations');
  font-weight: 200 900;
  font-stretch: 75% 125%;
} */

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
    color: var(--base-light)
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  a {
    color: var(--secondary-highlight);
    text-decoration: none;
  }
  
  h1 {
    color: var(--white);
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: 0.1rem;
    font-stretch: 75%;
    font-variation-settings: "ital" 5, "wdth" 125;
    font-variant: small-caps;
    padding-bottom: 2rem;
    text-shadow: 1px 2px 0 var(--text)
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
    padding: 25% 5%;
  }

  .link {
    text-align: center;
    width: 100%;
    padding: 2rem 0;
  }
  
  .active {
    background: var(--base-light);
  }
   
  .inactive {
    background: var(--lightgray);
  }
  .icon-nav{
    font-size: 1.2rem;
    color: var(--gray);
    pointer-events: none;
  }

  .icon-nav-active{
    color: var(--base);
    pointer-events: none;
  }

.delete-container {
  margin-right: auto;
}

.normal {
  -moz-animation: marqueeForward 10s linear infinite;
  -webkit-animation: marqueeForward 10s linear infinite;
  animation: marqueeForward 2s linear infinite;
@keyframes marqueeForward {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}

.reversed {
  -moz-animation: marqueeBackward 10s linear infinite;
  -webkit-animation: marqueeBackward 10s linear infinite;
  animation: marqueeBackward 2s linear infinite;
@keyframes marqueeBackward {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}




`;
