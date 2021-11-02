import React, {useState, useEffect, useRef} from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Box, IconButton, InputAdornment} from '@mui/material';

import {movieSearchResultsVar, movieSearchActiveVar} from 'Src/cache';
import {MovieSearchInput} from 'Src/styles';

import MovieSearchResultList from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultList';
interface Movie {
  originalTitle: string;
  id: string;
}

const MovieSearchComponent = () => {
  const elRef = useRef<HTMLElement>(null);
  const [searchInput, setSearchInput] = useState('');

  const baseurl = 'https://api.themoviedb.org/3/search/movie?';
  const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = () => {
    elRef.current?.scrollIntoView(false);
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
    <Box sx={{display: 'flex', justifyContent: 'center', paddingBottom: '8px'}}>
      <MovieSearchInput
        ref={elRef}
        data-cy='input_movie_search'
        placeholder="Search for a movie..."
        onChange={handleChange}
        value={searchInput}
        onBlur={clearResults}
        onFocus={handleFocus}
        endAdornment={
          <InputAdornment
            position="end"
          >
            <IconButton
              aria-label="Clear search results"
              onClick={clearResults}
            >
              <HighlightOffIcon fontSize='large'/>
            </IconButton>
          </InputAdornment>
        }
      />
      <MovieSearchResultList ref={elRef}/>
    </Box>
  );
};

export default MovieSearchComponent;
