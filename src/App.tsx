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
  if (window.localStorage.getItem('user_id')) {
    const {loading, error, data} = useQuery(resolvers.queries.ReturnCurrentUser,
        {variables: {id: 1}});
    console.log(loading, error, data);
    if (data) {
      currentUserVar({
        id: data.currentUser.id,
        email: data.currentUser.email,
        isLoggedIn: true,
      });
      console.log(currentUserVar());
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

