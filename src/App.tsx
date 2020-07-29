import React from 'react';

import Header from './components/Header/Header';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent/MovieSearchComponent';

  function App() {
    return (
      <React.Fragment>
        <Header />
        <MovieSearchComponent />
      </React.Fragment>
    );
  }

  export default App;
