import React from 'react';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import MovieProvider from './context/MovieContext';

  function App() {
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
