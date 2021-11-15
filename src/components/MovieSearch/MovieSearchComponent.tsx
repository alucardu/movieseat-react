import React, {useState, useEffect, useRef, useCallback} from 'react';

import {debounce} from 'lodash';
import useResizeObserver from 'use-resize-observer';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Box, IconButton, InputAdornment} from '@mui/material';

import {movieSearchResultsVar, movieSearchActiveVar} from 'Src/cache';
import {MovieSearchInput} from 'Src/styles';

import MovieSearchResultList from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultList';
import {IMovie} from 'Src/movieseat';
import {useReactiveVar} from '@apollo/client';
interface Movie {
  originalTitle: string;
  id: string;
}

const MovieSearchComponent = () => {
  const movieAdded = useReactiveVar(movieSearchActiveVar);
  const ref = useRef<HTMLDivElement>(null);
  const {width = 1} = useResizeObserver<HTMLDivElement>({ref});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const debounceToggle = useCallback(debounce(setSearchQuery, 500), []);

  const baseurl = 'https://api.themoviedb.org/3/search/movie?';
  const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    debounceToggle(e.target.value);
  };

  const handleFocus = () => {
    ref.current?.scrollIntoView(false);
  };

  const clearResults = () => {
    setTimeout(() => {
      setSearchInput('');
      movieSearchResultsVar([]);
      movieSearchActiveVar(false);
    }, 150);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      movieSearchActiveVar(true);
      fetch(baseurl + apikey + '&language=en-US&query=' + searchQuery + '&page=1&include_adult=false')
          .then((response) => response.json())
          .then((data) => {
            const filteredMovies = data.results.filter((movie: IMovie) =>
              movie.poster_path || movie.backdrop_path);
            movieSearchResultsVar(filteredMovies);
          });
    } else {
      movieSearchResultsVar([]);
      movieSearchActiveVar(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    movieAdded ? null : clearResults();
  }, [movieAdded]);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', paddingBottom: '8px'}}>
      <MovieSearchInput
        ref={ref}
        data-cy='input_movie_search'
        placeholder="Search for a movie..."
        onChange={handleChange}
        value={searchInput}
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
      <MovieSearchResultList width={width} ref={ref}/>
    </Box>
  );
};

export default MovieSearchComponent;
