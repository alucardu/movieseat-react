import React, {useEffect, useState, useContext} from 'react';
import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
import styled from 'styled-components';
import {IMovie} from '../../../movieseat';
import {chunk} from 'lodash';
import {MovieContext} from '../../../context/MovieContext';

const MovieList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 12px;
`;

const MovieOverview = () => {
  const [movies] = useContext(MovieContext);
  const [movieRows, setMovieRows] = useState<IMovie[][]>([]);

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
    setMovieRows(chunk(movies, numberOfMovies));
  };

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
