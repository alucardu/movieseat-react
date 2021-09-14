import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import {currentUserVar} from './cache';
import resolvers from './resolvers';

import SnackbarStack from './helpers/snackbar';

const App = () => {
  const checkIfUserIsLoggedIn = () => {
    const {error, loading, data} = useQuery(
        resolvers.queries.ReturnUser);
    if (!error && !loading && data.returnUser) {
      setTimeout(() => {
        currentUserVar({
          ...data.returnUser,
          isLoggedIn: true,
        });
      }, 0);
    }
  };

  checkIfUserIsLoggedIn();

  return (
    <React.Fragment>
      <Router>
        <Header />
        <MovieSearchComponent />
        <DashboardComponent />
        <SnackbarStack />
      </Router>
    </React.Fragment>
  );
};

export default App;

