import React from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';

const DashboardComponent = () => {
  return (
    <React.Fragment>
      <DashboardMovieOverviewMenu />
      <MovieOverview/>
    </React.Fragment>
  );
};

export default DashboardComponent;
