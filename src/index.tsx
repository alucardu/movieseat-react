import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #252525;
    margin: 0;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
);

render(<Root />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
