import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {chunk} from 'lodash';
import {IMovie} from '../../../movieseat';

import {useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = () => {
  const {loading, error, data} = useQuery(resolvers.queries.ReturnAllMovies);

  const movies: IMovie[] = data?.movies;

  const resizeEvent = () => {
    setMoviesInRow();
  };

  const setMoviesInRow = () => {
    const numberOfMovies = Math.floor((window.innerWidth -24) / 185);
    return chunk<IMovie>(movies, numberOfMovies);
  };

  useEffect(() => {
    setMoviesInRow();
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, [movies]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error.message}</p>;

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
