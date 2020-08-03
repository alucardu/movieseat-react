/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {MovieContext} from '../../../context/MovieContext';
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


const MovieOverview = () => {
  const [movieRows, setMovieRows] = useState<IMovie[][]>([]);
  const [movies] = useContext(MovieContext);
  let numberOfMovies: number;

  useEffect(() => {
    setMoviesInRow()
    window.addEventListener("resize", () => {
      setMoviesInRow()
    });
  }, []);

  const setMoviesInRow = () => {
    numberOfMovies = Math.floor((window.innerWidth -24) / 185);
    setMovieRows(chunk(movies, numberOfMovies));
  }

  return (
    <div>
      { movieRows ? movieRows.map((movieRow, index) => (
        <MovieList key={index}>
          { movieRow.map((movie: IMovie) => (
            <MovieOnDashboard key={movie.id} movie={movie}/>
          ))}
        </MovieList>
      )): null}
    </div>
  );
};

export default MovieOverview;

// 12 x 185 = 2220