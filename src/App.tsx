import React from 'react';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import {currentUserVar, moviesVar} from './cache';

import jwt from 'jsonwebtoken';
import returnMoviesFromUserHook from './customHooks/returnMoviesFromUserHook';

const App = () => {
  const getUser = (token) => {
    if (token) {
      token = token.replace('Bearer ', '');
      const currentUser: any = jwt.verify(token, 'supersecret');
      currentUserVar({id: currentUser.id, email: currentUser.email, isLoggedIn: true});
      return currentUser;
    }
  };

  moviesVar(returnMoviesFromUserHook());

  const isUserLoggedIn = () => {
    getUser(window.localStorage.getItem('token'));
  };

  isUserLoggedIn();

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

