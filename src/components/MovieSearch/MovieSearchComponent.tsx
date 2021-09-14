import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieSearchResultList from './MovieSearchResultList/MovieSearchResultList';

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
