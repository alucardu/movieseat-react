import React, {useState, createContext} from 'react';
import {IMovie} from '../movieseat';

type IMovieContext = [IMovie[], React.Dispatch<React.SetStateAction<IMovie[]>>];

export const MovieContext = createContext<IMovieContext>([[], () => null]);
export const MovieProvider = (props: any) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
