import React from 'react';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import {moviesVar, currentUserVar} from './cache';

import returnMoviesFromUserHook from './customHooks/returnMoviesFromUserHook';
import resolvers from './resolvers';
import {useQuery} from '@apollo/client';

const App = () => {
  const checkIfUserIsLoggedIn = () => {
    const {error, loading, data} = useQuery(
        resolvers.queries.ReturnUser);
    if (!error && !loading) {
      currentUserVar({
        ...data.returnUser,
        isLoggedIn: true,
      });
    }
  };

  checkIfUserIsLoggedIn();
  moviesVar(returnMoviesFromUserHook());

  return (
    <React.Fragment>
      <Router>
        <Header />
        <SnackbarProvider maxSnack={3}>
          <MovieSearchComponent />
          <DashboardComponent />
        </SnackbarProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;

