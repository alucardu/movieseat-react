// entry point for the apollo client

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  '@global': {
    'body': {
      background: '#252525',
      margin: '0',
      color: '#fff',
      fontFamily: 'Arial, Helvetica, sans-serif',
    },
  },
});

const init = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:9090/graphql',
    credentials: 'include',
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: httpLink,
    cache,
  });
  const Root = () => {
    useStyles();
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <App />
        </React.Fragment>
      </ApolloProvider>
    );
  };

  render(<Root />, document.getElementById('root'));
};

init();
