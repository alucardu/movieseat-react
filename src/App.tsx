import React from 'react';
import {SnackbarProvider} from 'notistack';

import Header from './components/Header/Header';
// eslint-disable-next-line max-len
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import MovieProvider from './context/MovieContext';
import localforage from 'localforage';

const App = () => {
  const setDefaults = () => {
    localforage.getItem<string []>('trackedMovies').then((trackedMovies) => {
      if (!trackedMovies) localforage.setItem('trackedMovies', []);
    });

    localforage.getItem<{}>('sortType').then((sortConfig) => {
      if (!sortConfig) {
        localforage.setItem(
            'sortType', {selectedSortType: 'release_date', orderType: true},
        );
      }
    });
  };

  setDefaults();

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

