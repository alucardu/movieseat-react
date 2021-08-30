import React from 'react';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import Login from './components/Login/Login';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <SnackbarProvider maxSnack={3}>
          <MovieSearchComponent />
          <DashboardComponent />
          <Route path="/login" exact component={Login} />
        </SnackbarProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;

