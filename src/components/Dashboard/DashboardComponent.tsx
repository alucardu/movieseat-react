import React from 'react';
import MovieOverview from './MovieOverview/MovieOverview';
import DashboardMovieOverviewMenu from './DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';
import {currentUserVar} from '../../cache';
import {useReactiveVar} from '@apollo/client';
import MovieSearchComponent from '../../components/MovieSearch/MovieSearchComponent';
import {RandomBackground} from './RandomBackground/RandomBackground';
import {Box} from '@mui/system';

import {useQuery} from '@apollo/client';

import resolvers from '../../resolvers';


const DashboardComponent = () => {
  const currentUser = useReactiveVar(currentUserVar);

  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      variables: {userId: currentUserVar().id},
    });

  if (error) return (<div>error</div>);
  if (loading) return (<div>loading...</div>);

  return (
    <React.Fragment>
      {currentUser.isLoggedIn ?
        <Box sx={{width: '100vw'}}>
          <MovieSearchComponent />
          <DashboardMovieOverviewMenu />
          <MovieOverview type='dashboard' movies={movies}/>
        </Box> :
        <RandomBackground />
      }
    </React.Fragment>
  );
};

export default DashboardComponent;
