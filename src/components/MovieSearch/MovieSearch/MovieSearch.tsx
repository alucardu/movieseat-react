import React, {useState, useEffect} from 'react';

import {MovieSearchInput} from 'Src/styles';

const MovieSearch = ( {createSearchResults}: {createSearchResults: any} ) => {
  const [searchInput, setSearchInput] = useState('');

  const baseurl = 'https://api.themoviedb.org/3/search/movie?';
  const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearResults = () => {
    setTimeout(() => {
      setSearchInput('');
      createSearchResults('', []);
    }, 150);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      fetch(baseurl + apikey + '&language=en-US&query=' + searchInput + '&page=1&include_adult=false')
          .then((response) => response.json())
          .then((data) => createSearchResults(searchInput, data.results));
    }
  }, [searchInput]);

  return (
    <MovieSearchInput
      variant='filled'
      data-cy='input_movie_search'
      placeholder="Search for a movie..."
      onChange={handleChange}
      value={searchInput}
      onBlur={clearResults}
    />
  );
};

export default MovieSearch;

