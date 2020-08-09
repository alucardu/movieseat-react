import React from 'react';
import {SnackbarProvider} from 'notistack';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import MovieProvider from './context/MovieContext';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <SnackbarProvider maxSnack={3}>
        <MovieProvider>
          <MovieSearchComponent />
          <DashboardComponent />
        </MovieProvider>
      </SnackbarProvider>
    </React.Fragment>
  );
};

export default App;

