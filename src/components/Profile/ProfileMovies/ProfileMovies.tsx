import React from 'react';

import {useQuery} from '@apollo/client';

import {Box, Typography} from '@mui/material';

import resolvers from 'Src/resolvers';
import MovieOverview from 'Components/Dashboard/MovieOverview/MovieOverview';
import {Onboarding} from 'Src/styles';

export const ProfileMovies = (profileId) => {
  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      fetchPolicy: 'no-cache',
      variables: {userId: profileId.profileId},
    });


  if (error) return (<div>error</div>);
  if (loading) return (<div>loading</div>);

  const Onboard = () => {
    return (
      <Onboarding>
        <Typography variant='h4'>This user has not added any movies yet...</Typography>
      </Onboarding>
    );
  };

  return (
    <Box sx={{width: '100%'}}>
      {movies?.length <= 0 ? <Onboard/> : <MovieOverview type='suggestion' movies={movies}/>}
    </Box>
  );
};
