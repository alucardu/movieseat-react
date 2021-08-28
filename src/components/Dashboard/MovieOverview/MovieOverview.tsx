import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {IMovie} from '../../../movieseat';
import {chunk} from 'lodash';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = (props) => {
  const {movies} = props;
  const resizeEvent = () => {
    setMoviesInRow();
  };

  useEffect(() => {
    setMoviesInRow();
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, [movies]);


  const setMoviesInRow = () => {
    const numberOfMovies = Math.floor((window.innerWidth -24) / 185);
    return chunk<IMovie>(movies, numberOfMovies);
  };

  const movieRows = setMoviesInRow();

  return (
    <div>
      { movieRows ? movieRows.map((movieRow, index) => (
        <MovieList key={index}>
          { movieRow.map((movie) => (
            <MovieOnDashboard key={movie.id} movie={movie}/>
          ))}
        </MovieList>
      )): null}
    </div>
  );
};

MovieOverview.propTypes = {
  movies: PropTypes.array,
};


export default MovieOverview;
