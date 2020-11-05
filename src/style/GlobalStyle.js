import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html, body, #root {
        height: 100%;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: 'Roboto';
        font-size: 500;
    }

    button {
        cursor: pointer;
    }
`;
