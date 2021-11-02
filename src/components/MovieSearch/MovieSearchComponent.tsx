import React, {useState} from 'react';

import {Box} from '@mui/material';

import Header from 'Components/MovieSearch/Header/Header';
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
    <Box>
      <Header createSearchResults={createSearchResults} />
      { showList ? <MovieSearchResultList movieList={movieList}/> : null}
    </Box>
  );
};

export default MovieSearchComponent;
