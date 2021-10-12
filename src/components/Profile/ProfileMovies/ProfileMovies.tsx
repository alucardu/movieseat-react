import React from 'react';
import {useQuery} from '@apollo/client';

import {Box} from '@mui/system';
import resolvers from '../../../resolvers';
import MovieOverview from '../../Dashboard/MovieOverview/MovieOverview';

export const ProfileMovies = (profileId) => {
  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      fetchPolicy: 'no-cache',
      variables: {userId: profileId.profileId},
    });


  if (error) return (<div>error</div>);
  if (loading) return (<div>loading</div>);

  return (
    <Box>
      <MovieOverview type='suggestion' movies={movies}/>
    </Box>
  );
};
