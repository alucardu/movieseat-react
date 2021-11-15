import React from 'react';
import {Link} from 'react-router-dom';

import {Box, Typography} from '@mui/material';

import {useQuery} from '@apollo/client';


import {Onboarding} from 'Src/styles';

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

  const Onboard = () => {
    return (
      <Onboarding>
        <Typography variant='h4'>Start adding some movies!</Typography>
        <Typography variant='body1'>Use the search field to start adding movies.</Typography>
        <Typography variant='body1'>Or maybe you want some <Link to='/suggestions'>suggestions</Link>?</Typography>
      </Onboarding>
    );
  };

  return (
    <React.Fragment>
      <Box sx={{width: '100%', padding: '8px'}}>
        <MovieSearchComponent />
        {movies?.length <= 0 ? <Onboard/> : <MovieOverview type='dashboard' movies={movies}/>}
      </Box>
    </React.Fragment>
  );
};

export default DashboardComponent;
