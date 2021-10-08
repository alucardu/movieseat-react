import {useQuery, useReactiveVar} from '@apollo/client';
import React from 'react';
import {useParams} from 'react-router';
import resolvers from '../../resolvers';
import {currentUserVar} from '../../cache';
import FollowUser from './ManageFriends/FollowStatus';
import {FollowedUsers} from './ManageFriends/FollowedUsers';
import {FollowedByUSers} from './ManageFriends/FollowedByUsers';
import {SearchUser} from './ManageFriends/SearchUsers';
import {ProfileOptions} from './ManageFriends/ProfileOptions';

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
    <div>
      {currentUser.id !== parseInt(paramId) && <FollowUser user={user} />}
      {currentUser.id == parseInt(paramId) && <ProfileDashboad/> }
    </div>
  );
};

export default profile;
