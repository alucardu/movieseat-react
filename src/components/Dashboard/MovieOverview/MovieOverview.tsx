import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {chunk} from 'lodash';
import {makeStyles} from '@mui/styles';
import {List} from '@mui/material';

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

const MovieOverview = (props) => {
  const type = {...props}.type;
  const movies = {...props}.movies;

  const movieOverviewContainerRef = useRef<any>(null);
  const [movieRows, setMovieRows] = useState<IMovie[][]>([]);

  const classes = useStyles();

  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    sortMovies(movies).then((res) => {
      if (size > 0) {
        const rowMaxLength = Math.floor(size / 200);
        const rows = chunk(res, Math.floor(size / 200));

        rows.map((movieRow) => {
          if (rowMaxLength !== movieRow.length) {
            for (let i = movieRow.length; i < rowMaxLength; i++) {
              movieRow.push({id: i, original_title: '', poster_path: '', release_date: '', tmdb_id: 1, backdrop_path: ''});
            }

            return movieRow;
          }
        });

        if (movies) setMovieRows(rows);
      }
    });
  }, [movies, size]);

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
    <Box className={classes.container} ref={movieOverviewContainerRef}>
      {movies?.length <= 0 ? <Onboard/> : null}
      { movieRows?.map((movieRow, index) => (
        <List
          data-cy='list_movie_overview_dashboard'
          className={classes.movieList}
          key={index}
        >
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard
              key={movie.id}
              movie={movie}
              type={type}
              ref={movieOverviewContainerRef}/>
          ))}
        </List>
      ))}
    </Box>
  );
};

export default MovieOverview;
