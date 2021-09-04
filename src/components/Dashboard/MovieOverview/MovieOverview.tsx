import React from 'react';
import PropTypes from 'prop-types';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {chunk} from 'lodash';
import {IMovie} from '../../../movieseat';

import {useReactiveVar} from '@apollo/client';

import {moviesVar, currentUserVar} from '../../../cache';

// import {useEffect} from 'react';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = () => {
  let movieRows;

  const movies: IMovie[] = useReactiveVar(moviesVar);
  const currentUser = useReactiveVar(currentUserVar);

  const setMovieRows = () => {
    movieRows = chunk(movies, 8);
  };

  setMovieRows();

  return (
    <div>
      {currentUser.email}
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
