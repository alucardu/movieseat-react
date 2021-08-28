import React from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';
import {IMovie} from '../../movieseat';

import {useQuery} from '@apollo/client';
import resolvers from '../../resolvers';

const DashboardComponent = () => {
  const {loading, error, data} = useQuery(resolvers.queries.ReturnAllMovies);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const movies: IMovie[] = data.movies;

  return (
    <React.Fragment>
      <DashboardMovieOverviewMenu />
      { movies.length > 0 ? <MovieOverview movies={movies} /> : null }
    </React.Fragment>
  );
};

export default DashboardComponent;
