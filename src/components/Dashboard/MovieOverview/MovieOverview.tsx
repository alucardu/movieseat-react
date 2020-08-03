import React, {useContext} from 'react';
import {MovieContext} from '../../../context/MovieContext';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {IMovie} from '../../../movieseat';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = () => {
  const [movies] = useContext(MovieContext);

  return (
    <MovieList>
      { movies ? movies.map((movie: IMovie) => (
        <MovieOnDashboard key={movie.id} movie={movie}/>
      )) : null}
    </MovieList>
  );
};

export default MovieOverview;
