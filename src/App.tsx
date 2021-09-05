import React from 'react';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import {currentUserVar} from './cache';


import resolvers from './resolvers';
import {useQuery} from '@apollo/client';


const App = () => {
  const checkIfUserIsLoggedIn = () => {
    const {error, loading, data} = useQuery(
        resolvers.queries.ReturnUser);
    if (!error && !loading && data.returnUser) {
      currentUserVar({
        ...data.returnUser,
        isLoggedIn: true,
      });
    }
  };

  checkIfUserIsLoggedIn();

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

