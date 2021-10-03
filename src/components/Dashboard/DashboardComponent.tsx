import React from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';
import {currentUserVar} from '../../cache';
import {useReactiveVar} from '@apollo/client';
import MovieSearchComponent from '../../components/MovieSearch/MovieSearchComponent';
import {RandomBackground} from './RandomBackground/RandomBackground';
import {Box} from '@mui/system';


const DashboardComponent = () => {
  const currentUser = useReactiveVar(currentUserVar);

  return (
    <React.Fragment>
      {currentUser.isLoggedIn ?
        <Box sx={{width: '100vw'}}>
          <MovieSearchComponent />
          <DashboardMovieOverviewMenu />
          <MovieOverview/>
        </Box> :
        <RandomBackground />
      }
    </React.Fragment>
  );
};

export default DashboardComponent;
