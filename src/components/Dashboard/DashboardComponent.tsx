import React, {useContext, useEffect} from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import {MovieContext} from '../../context/MovieContext';
import localforage from 'localforage';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';
import {IMovie} from '../../movieseat';

import {useQuery} from '@apollo/client';
import resolvers from '../../resolvers';

const DashboardComponent = () => {
  const {loading, error, data} = useQuery(resolvers.ReturnAllMovies);

  console.log('data: ', loading, error, data);
  const [movies, setMovies] = useContext(MovieContext);

  useEffect(() => {
    localforage.getItem<IMovie []>('trackedMovies').then((movieList) => {
      if (movieList) setMovies(() => movieList);
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
