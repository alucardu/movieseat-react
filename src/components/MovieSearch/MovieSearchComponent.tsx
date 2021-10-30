import React, {useState} from 'react';

import {Box} from '@mui/material';

import MovieSearch from 'Components/MovieSearch/MovieSearch/MovieSearch';
import MovieSearchResultList from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultList';
interface Movie {
  originalTitle: string;
  id: string;
}

const MovieSearchComponent = () => {
  const [movieList, setMovies] = useState<Movie[]>([]);
  const [showList, toggleList] = useState(false);

  const createSearchResults = ((query: string, movies: Movie[]) => {
    toggleList(!!query);
    if (query) setMovies([...movies]);
  });

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
      <MovieSearch createSearchResults={createSearchResults} />
      { showList ? <MovieSearchResultList movieList={movieList}/> : null}
    </Box>
  );
};

export default MovieSearchComponent;
