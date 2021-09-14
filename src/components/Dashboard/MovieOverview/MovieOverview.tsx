import React from 'react';
import {chunk} from 'lodash';
import {useReactiveVar} from '@apollo/client';
import {makeStyles} from '@material-ui/styles';

import {IMovie} from '../../../movieseat';
import {moviesVar} from '../../../cache';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';

const useStyles = makeStyles({
  movieList: {
    listStyle: 'none',
    display: 'flex',
    padding: '0',
    margin: '0 12px',
  },
});

const MovieOverview = () => {
  const classes = useStyles();
  const movies: IMovie[] = useReactiveVar(moviesVar);
  let movieRows;

  const setMovieRows = () => {
    movieRows = chunk(movies, 8);
  };

  setMovieRows();

  return (
    <div>
      { movieRows.map((movieRow, index) => (
        <ul className={classes.movieList} key={index}>
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard key={movie.id} movie={movie}/>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default MovieOverview;
