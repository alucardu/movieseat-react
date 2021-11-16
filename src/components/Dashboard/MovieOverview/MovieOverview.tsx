import React, {useState, useEffect, useLayoutEffect} from 'react';

import chunk from 'lodash/chunk';

import {Box} from '@mui/material';

import {IMovie} from 'Src/movieseat';
import {MovieOverviewList} from 'Src/styles';
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
  const [overlay, setOverlay] = useState(true);

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

        rows.map((movieRow) => {
          if (rowMaxLength !== movieRow.length) {
            for (let i = movieRow.length; i < rowMaxLength; i++) {
              movieRow.push({id: 0, original_title: '', poster_path: '', release_date: '', tmdb_id: 1, backdrop_path: ''});
            }
            return movieRow;
          }
        });

        if (movies) setMovieRows(rows);
      }
      if (res.length === 0 && size > 0) {
        setMovieRows(res);
      }
    });
  }, [movies, size]);

  useEffect(() => {
    setTimeout(() => {
      setOverlay(false);
    }, 1500);
  }, [movies]);

  return (
    <Box>
      {overlay ? <Box sx={{position: 'absolute', height: '100vh', width: '100vw', left: 0, top: 0, background: '#2121217a', zIndex: 5}}></Box> : null}

      { movieRows?.map((movieRow, index) => (
        <MovieOverviewList
          disablePadding={true}
          data-cy='list_movie_overview_dashboard'
          key={index}
        >
          { movieRow.map((movie: IMovie, index) => (
            <React.Fragment key={index + index}>
              <MovieOnDashboard
                id={movie.id}
                movie={movie}
                type={type}
                isActive={movie.id === activeId}
                toggle={handleClick}
              />
            </React.Fragment>
          ))}
        </MovieOverviewList>
      ))}
    </Box>
  );
};

export default MovieOverview;
