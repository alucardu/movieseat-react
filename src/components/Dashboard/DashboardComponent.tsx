import React from 'react';

import {Box} from '@mui/material';

import {useQuery} from '@apollo/client';

import {currentUserVar} from 'Src/cache';
import resolvers from 'Src/resolvers';

import MovieOverview from 'Components/Dashboard/MovieOverview/MovieOverview';
import MovieSearchComponent from 'Components/MovieSearch/MovieSearchComponent';

const DashboardComponent = () => {
  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      variables: {userId: currentUserVar().id},
    });

  if (error) return (<div>error {error.message}</div>);
  if (loading) return (<div>loading...</div>);

  return (
    <React.Fragment>
      <Box sx={{width: '100vw', padding: '8px'}}>
        <MovieSearchComponent />
        <MovieOverview type='dashboard' movies={movies}/>
      </Box>
    </React.Fragment>
  );
};

export default DashboardComponent;
