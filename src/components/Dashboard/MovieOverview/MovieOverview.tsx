import React, {useState, useEffect} from 'react';
import {chunk} from 'lodash';
import {makeStyles} from '@mui/styles';

import {IMovie} from '../../../movieseat';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import {useQuery} from '@apollo/client';

import resolvers from '../../../resolvers';

import {currentUserVar} from '../../../cache';
import sortMovies from '../../../helpers/sortMovies';
import {Box} from '@mui/system';
import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  movieList: {
    listStyle: 'none',
    display: 'flex',
    padding: '0',
    margin: '0 12px',
  },
  container: {
    padding: '16px',
  },
  onboard: {
    display: 'flex',
    flexDirection: 'column',
    height: '40vh',
    justifyContent: 'center',
    alignItems: 'center',
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

  const Onboard = () => {
    return (
      <Box className={classes.onboard}>
        <Typography variant='h4'>Start adding some movies!</Typography>
        <Typography variant='body1'>Use the search field to start adding movies.</Typography>
        <Typography variant='body1'>Or maybe you want some <Link to='/suggestions'>suggestions</Link>?</Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      {movies.length <= 0 ? <Onboard/> : null}
      { movieRows?.map((movieRow, index) => (
        <ul className={classes.movieList} key={index}>
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard key={movie.id} movie={movie}/>
          ))}
        </ul>
      ))}
    </Box>
  );
};

export default MovieOverview;
