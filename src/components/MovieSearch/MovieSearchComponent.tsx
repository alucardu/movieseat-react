import React, { useState } from 'react';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieSearchResultList from './MovieSearchResultList/MovieSearchResultList';
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
  const createSearchResults = ((query: string, movies: Movie[]) => {
    toggleList(!!query);
    if (query) setMovies([...movies]);
  });

  return (
    <MovieSearchContainer>
      <MovieSearch createSearchResults={createSearchResults} />
      { showList ? <MovieSearchResultList movieList={movieList}/> : null}      
    </MovieSearchContainer>
  )
}

export default MovieSearchComponent;
