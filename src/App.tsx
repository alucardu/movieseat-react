import React from 'react';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import {useQuery} from '@apollo/client';
import resolvers from './resolvers';

import {currentUserVar} from './cache';

const App = () => {
  const userId = Number(window.localStorage.getItem('user_id'));
  if (userId) {
    const {data} = useQuery(resolvers.queries.ReturnCurrentUser,
        {variables: {id: userId}});
    if (data) {
      currentUserVar({
        id: data.currentUser.id,
        email: data.currentUser.email,
        isLoggedIn: true,
      });
    }
  }

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

