import React from 'react';
import {useQuery} from '@apollo/client';

import {Box} from '@mui/system';
import resolvers from '../../../resolvers';
import {List} from '@mui/material';
import {IMovie} from '../../../movieseat';
import MovieOnDashboard from '../../Dashboard/MovieOnDashboard/MovieOnDashboard';

export const ProfileMovies = (profileId) => {
  const type='suggestion';
  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      fetchPolicy: 'no-cache',
      variables: {userId: profileId.profileId},
    });


  if (error) return (<div>error</div>);
  if (loading) return (<div>loading</div>);

  return (
    <Box>
      <List data-cy='list_profile_movies' sx={{display: 'flex', flexWrap: 'wrap'}}>
        {movies.map((movie: IMovie) => {
          return (
            <MovieOnDashboard key={movie.id} movie={movie} type={type} />
          );
        })}
      </List>
    </Box>
  );
};
