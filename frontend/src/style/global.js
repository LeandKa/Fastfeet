import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus{
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #7d40e7;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #4409b4;
  }
`;

const ThemeProps = {
  colors: {
    primary: '#7D40E7',
    secondary: '#FFF',

    gray: '#CCC',

    background: '#ddd',
    border: '#ddd',

    body: '#999',
    title: '#444',

    delivered: '#2CA42B',
    pendiing: '#C1BC35',
    canceled: '#DE3B3B',
    started: '#4D85EE',
  },
};

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={ThemeProps}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children: PropTypes.element.isRequired,
};
