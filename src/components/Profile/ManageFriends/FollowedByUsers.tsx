import React from 'react';
import {Link} from 'react-router-dom';

import {useQuery} from '@apollo/client';

import {Box, List, ListItem, Typography} from '@mui/material';

import resolvers from 'Src/resolvers';

export const FollowedByUSers = () => {
  const {loading, error, data: {returnFollowedBy: followedBy} = {}} = useQuery(resolvers.queries.ReturnFollowedUsers);

  if (loading) return (<div>Loading</div>);
  if (error) return (<div>Error</div>);

  return (
    <Box className='profileBox'>
      <Typography variant='h6'>
        Followed by users
      </Typography>
      <List>
        {followedBy.map((user) => {
          return (
            <ListItem key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
