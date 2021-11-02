import React, {useState, useEffect} from 'react';

import {Box} from '@mui/material';

import {movieSearchResultsVar, movieSearchActiveVar} from 'Src/cache';
import {MovieSearchInput} from 'Src/styles';

import MovieSearchResultList from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultList';
interface Movie {
  originalTitle: string;
  id: string;
}

const MovieSearchComponent = () => {
  const [searchInput, setSearchInput] = useState('');

  const baseurl = 'https://api.themoviedb.org/3/search/movie?';
  const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearResults = () => {
    setTimeout(() => {
      setSearchInput('');
      movieSearchResultsVar([]);
    }, 150);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      movieSearchActiveVar(true);
      fetch(baseurl + apikey + '&language=en-US&query=' + searchInput + '&page=1&include_adult=false')
          .then((response) => response.json())
          .then((data) => movieSearchResultsVar(data.results));
    } else {
      movieSearchResultsVar([]);
      movieSearchActiveVar(false);
    }
  }, [searchInput]);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <MovieSearchInput
        variant='filled'
        data-cy='input_movie_search'
        placeholder="Search for a movie..."
        onChange={handleChange}
        value={searchInput}
        onBlur={clearResults}
      />
      <MovieSearchResultList />
    </Box>
  );
};

export default MovieSearchComponent;
