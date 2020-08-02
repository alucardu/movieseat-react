import React, { useContext, useEffect } from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import { MovieContext } from '../../context/MovieContext';
import localforage from 'localforage';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';

type IMovie = {
  original_title: string;
  poster_path: string;
  id: number;
};

const DashboardComponent = () =>  {

  let [movies, setMovies] = useContext(MovieContext)

  useEffect(() => {
    localforage.getItem<IMovie []>('trackedMovies').then((value) => {
      if (value) setMovies(prevMovies => value)
    })
  })

  return (
    <React.Fragment>
      <DashboardMovieOverviewMenu />
      { movies.length > 0 ? <MovieOverview /> : null }
    </React.Fragment>
    )
}

export default DashboardComponent;
