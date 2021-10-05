import React, {useState, useEffect} from 'react';
import {chunk} from 'lodash';
import {makeStyles} from '@mui/styles';

import {IMovie} from '../../../movieseat';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import {useQuery} from '@apollo/client';

import resolvers from '../../../resolvers';

import {currentUserVar} from '../../../cache';
import sortMovies from '../../../helpers/sortMovies';

const useStyles = makeStyles({
  movieList: {
    listStyle: 'none',
    display: 'flex',
    padding: '0',
    margin: '0 12px',
  },
});

const MovieOverview = () => {
  const [movieRows, setMovieRows] = useState<IMovie[][]>([]);
  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      variables: {userId: currentUserVar().id},
    });

  const classes = useStyles();

  useEffect(() => {
    sortMovies(movies).then((res) => {
      if (movies) setMovieRows(chunk(res, 8));
    });
  }, [movies]);

  if (error) return (<div>error</div>);
  if (loading) return (<div>loading...</div>);

  return (
    <div>
      { movieRows?.map((movieRow, index) => (
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
