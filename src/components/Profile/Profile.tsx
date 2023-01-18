import React from 'react';
import {useParams} from 'react-router';

import {useQuery, useReactiveVar} from '@apollo/client';

import {Box} from '@mui/material';

import resolvers from 'Src/resolvers';
import {currentUserVar} from 'Src/cache';

import FollowUser from 'Components/Profile/ManageFriends/FollowStatus';
import {FollowedUsers} from 'Components/Profile/ManageFriends/FollowedUsers';
import {FollowedByUSers} from 'Components/Profile/ManageFriends/FollowedByUsers';
import {SearchUser} from 'Components/Profile/ManageFriends/SearchUsers';
import {ProfileOptions} from 'Components/Profile/ManageFriends/ProfileOptions';
import {ProfileMovies} from 'Components/Profile/ProfileMovies/ProfileMovies';

const profile = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const {id: paramId} = useParams<{id: string}>();

  const {error, loading, data: {returnUser: user} = {}} =
    useQuery(resolvers.queries.ReturnUser, {
      variables: {userId: parseInt(paramId)},
    });

  if (error) return (<div>error {error.message}</div>);
  if (loading) return (<div>loading... </div>);

  if (!user) return (<div>User not found</div>);

  const ProfileDashboad = () => {
    return (
      <>
        <FollowedUsers />
        <FollowedByUSers />
        <SearchUser />
        <ProfileOptions />
      </>
    );
  };

  return (
    <Box sx={{width: '100%', padding: '8px', display: 'flex', flexWrap: 'wrap'}}>
      {currentUser.id !== parseInt(paramId) ?
      <>
        v: 1
        <FollowUser user={user} />
        <ProfileMovies profileId={parseInt(paramId)} />
      </>:
      <ProfileDashboad/>}
    </Box>
  );
};

export default profile;
