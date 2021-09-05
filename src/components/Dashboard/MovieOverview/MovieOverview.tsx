import React from 'react';
import PropTypes from 'prop-types';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {chunk} from 'lodash';
import {useReactiveVar} from '@apollo/client';
import {IMovie} from '../../../movieseat';
import {currentUserVar} from '../../../cache';
import returnMoviesFromUserHook from '../../../customHooks/returnMoviesFromUserHook';

// import {useEffect} from 'react';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = () => {
  useReactiveVar(currentUserVar);
  let movieRows;

  const movies: IMovie[] = returnMoviesFromUserHook();

  const setMovieRows = () => {
    movieRows = chunk(movies, 8);
  };

  setMovieRows();

  return (
    <div>
      { movieRows.map((movieRow, index) => (
        <MovieList key={index}>
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard key={movie.id} movie={movie}/>
          ))}
        </MovieList>
      ))}
    </div>
  );
};

MovieOverview.propTypes = {
  movies: PropTypes.array,
};

export default MovieOverview;
