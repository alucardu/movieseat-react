import React from 'react';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import MovieProvider from './context/MovieContext';
import localforage from 'localforage';

  const App = () => {

    const setDefaults = () => {
      localforage.getItem<string []>('trackedMovies').then((value) => {
        const trackedMovies = value;
        if (!trackedMovies) localforage.setItem('trackedMovies', [])
      })

      localforage.setItem('sortType', {selectedSortType: 'release_date', orderType: true})
    }

    setDefaults()

    return (
      <React.Fragment>
        <Header />
        <MovieProvider>
          <MovieSearchComponent />
          <DashboardComponent />
        </MovieProvider>
      </React.Fragment>
    );
  }

  export default App;

