import React, { useState, useEffect } from 'react';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieResultList from '../MovieResultList/MovieResultList';
import styled from 'styled-components';

interface Movie {
  original_title: string;
  id: string;
}

const MovieSearchContainer= styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

const MovieSearchComponent = () => { 

  const [movieList, setMovies] = useState<Movie[]>([]);
  
  const [showList, toggleList] = useState(false);
  const addMovie = ((query: string, movies: Movie[]) => {
    toggleList(!!query);
    if (query) setMovies([...movies]);
  });

  return (
    <MovieSearchContainer>
      <MovieSearch addMovie={addMovie} />
      { showList ? <MovieResultList movieList={movieList}/> : null}      
    </MovieSearchContainer>
  )
}

export default MovieSearchComponent;
