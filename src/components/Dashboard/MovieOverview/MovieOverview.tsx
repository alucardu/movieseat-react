import React, { useContext } from 'react';
import { MovieContext } from '../../../context/MovieContext';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';

type IMovie = {
  original_title: string;
  poster_path: string;
  id: number;
};

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`

const MovieOverview = () => {

  let [movies, setMovies] = useContext(MovieContext)

  return (
    <MovieList>
      { movies ? movies.map(movie => (
         <MovieOnDashboard movie={movie}/>
      )) : null}
    </MovieList>
  )
}

export default MovieOverview