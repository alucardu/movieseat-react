// entry point for the apollo client

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {makeStyles} from '@mui/styles';
import {StyledEngineProvider} from '@mui/material/styles';

const useStyles = makeStyles({
  '@global': {
    'body': {
      background: '#252525',
      margin: '0',
      color: '#fff',
      fontFamily: 'Arial, Helvetica, sans-serif',
    },
    '#root': {
      display: 'flex',
    },
    '.profileBox': {
      display: 'flex',
      flexDirection: 'column',
      margin: '16px',
      padding: '16px',
      color: 'black',
      backgroundColor: '#f2f2f2',
      borderRadius: '4px',
    },
  },
});

const configurations = {
  development: {hostname: 'http://localhost'},
  production: {hostname: 'https://moviese.at'},
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const init = () => {
  const httpLink = createHttpLink({
    uri: `${config.hostname}:9090/graphql`,
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
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </React.Fragment>
      </ApolloProvider>
    );
  };

  render(<Root />, document.getElementById('root'));
};

init();
