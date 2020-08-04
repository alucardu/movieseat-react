import React, {useContext, useEffect} from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import {MovieContext} from '../../context/MovieContext';
import localforage from 'localforage';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';
import {IMovie} from '../../movieseat';

const DashboardComponent = () => {
  const [movies, setMovies] = useContext(MovieContext);

  useEffect(() => {
    localforage.getItem<IMovie []>('trackedMovies').then((value) => {
      if (value) setMovies(() => value);
    });
  }, []);

  return (
    <React.Fragment>
      <DashboardMovieOverviewMenu />
      { movies.length > 0 ? <MovieOverview /> : null }
    </React.Fragment>
  );
};

export default DashboardComponent;
