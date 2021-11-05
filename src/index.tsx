import React from 'react';
import {render} from 'react-dom';

import {A2hs} from 'Helpers/a2hs';

import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'Src/theme';

import App from 'Src/App';

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
    return (
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <App />
              <A2hs />
            </CssBaseline>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    );
  };

  render(<Root />, document.getElementById('root'));
};

serviceWorkerRegistration.register();

init();
