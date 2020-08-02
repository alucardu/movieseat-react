import React, { useState, createContext } from 'react';

type IMovie = {
  original_title: string;
  poster_path: string;
  id: number;
};

type IMovieContext = [IMovie[], React.Dispatch<React.SetStateAction<IMovie[]>>];

export const MovieContext = createContext<IMovieContext>([[], () => null]);
export const MovieProvider = props => {

  const [movies, setMovies] = useState<IMovie[]>([]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
  
};

export default MovieProvider;