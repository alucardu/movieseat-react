import React, {useState, useEffect, useLayoutEffect} from 'react';

import chunk from 'lodash/chunk';

import {Typography, Box} from '@mui/material';
import {Link} from 'react-router-dom';

import {MovieOverviewList} from 'Src/styles';
import {IMovie} from 'Src/movieseat';
import {Onboarding} from 'Src/styles';
import sortMovies from 'Helpers/sortMovies';
import MovieOnDashboard from 'Components/Dashboard/MovieOnDashboard/MovieOnDashboard';

const MovieOverview = (props) => {
  const type = {...props}.type;
  const movies = {...props}.movies;

  const [activeId, setActiveId] = useState(null);
  const [movieRows, setMovieRows] = useState<IMovie[][]>([]);

  const handleClick = (id) => {
    id === activeId ? setActiveId(null) : setActiveId(id);
  };

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
        const rowMaxLength = Math.floor(size / 180);
        const rows = chunk(res, Math.floor(size / 180));

        console.log(rowMaxLength);
        console.log(size);

        rows.map((movieRow) => {
          console.log(movieRow.length);
          if (rowMaxLength !== movieRow.length) {
            for (let i = movieRow.length; i < rowMaxLength; i++) {
              console.log(i);
              movieRow.push({id: 0, original_title: '', poster_path: '', release_date: '', tmdb_id: 1, backdrop_path: ''});
            }

            console.log(movieRow);

            return movieRow;
          }
        });

        console.log(rows);

        if (movies) setMovieRows(rows);
      }
      if (res.length === 0 && size > 0) {
        setMovieRows(res);
      }
    });
  }, [movies, size]);

  const Onboard = () => {
    return (
      <Onboarding>
        <Typography variant='h4'>Start adding some movies!</Typography>
        <Typography variant='body1'>Use the search field to start adding movies.</Typography>
        <Typography variant='body1'>Or maybe you want some <Link to='/suggestions'>suggestions</Link>?</Typography>
      </Onboarding>
    );
  };

  return (
    <Box>
      {movies?.length <= 0 ? <Onboard/> : null}
      { movieRows?.map((movieRow, index) => (
        <MovieOverviewList
          disablePadding={true}
          data-cy='list_movie_overview_dashboard'
          key={index}
        >
          {movieRow.length}
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard
              id={movie.id}
              key={movie.id}
              movie={movie}
              type={type}
              isActive={movie.id === activeId}
              toggle={handleClick}
            />
          ))}
        </MovieOverviewList>
      ))}
    </Box>
  );
};

export default MovieOverview;
