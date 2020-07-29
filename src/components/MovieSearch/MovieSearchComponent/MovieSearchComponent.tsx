import React, { useState } from 'react';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieResultList from '../MovieResultList/MovieResultList';

interface Movie {
  original_title: string;
  id: string;
}

const MovieSearchComponent = () => {
  const [movieList, setMovies] = useState<Movie[]>([]);

  const addMovie = ((movies: Movie[]) => {
    setMovies([...movies]);
  });

  return (
    <React.Fragment>
      <MovieSearch addMovie={addMovie} />
      <MovieResultList movieList={movieList}/>      
    </React.Fragment>
  )
}

export default MovieSearchComponent;
