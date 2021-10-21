import React, {useState} from 'react';

import {makeStyles} from '@mui/styles';

import MovieSearch from 'Components/MovieSearch/MovieSearch/MovieSearch';
import MovieSearchResultList from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultList';

const useStyles = makeStyles({
  movieSearchContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
});

interface Movie {
  originalTitle: string;
  id: string;
}

const MovieSearchComponent = () => {
  const classes = useStyles();
  const [movieList, setMovies] = useState<Movie[]>([]);

  const [showList, toggleList] = useState(false);
  const createSearchResults = ((query: string, movies: Movie[]) => {
    toggleList(!!query);
    if (query) setMovies([...movies]);
  });

  return (
    <div className={classes.movieSearchContainer}>
      <MovieSearch createSearchResults={createSearchResults} />
      { showList ? <MovieSearchResultList movieList={movieList}/> : null}
    </div>
  );
};

export default MovieSearchComponent;
