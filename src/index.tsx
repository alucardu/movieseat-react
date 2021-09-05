// entry point for the apollo client

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createGlobalStyle} from 'styled-components';

import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';

const GlobalStyle = createGlobalStyle`
  body {
    background: #252525;
    margin: 0;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const init = async () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:9090/graphql',
    credentials: 'include',
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: httpLink,
    cache,
  });

  const Root = () => (
    <ApolloProvider client={client}>
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    </ApolloProvider>
  );

  render(<Root />, document.getElementById('root'));
};

init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
