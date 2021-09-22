import {useQuery, useReactiveVar} from '@apollo/client';
import React from 'react';
import {useParams} from 'react-router';
import resolvers from '../../resolvers';
import ManageFriends from './ManageFriends/ManageFriends';
import {currentUserVar} from '../../cache';

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
      <ManageFriends />
    );
  };

  return (
    <div>
      {paramId}, {user.id}
      <p>Profile {user.user_name}</p>
      {currentUser.id == parseInt(paramId) && <ProfileDashboad/> }
    </div>
  );
};

export default profile;
