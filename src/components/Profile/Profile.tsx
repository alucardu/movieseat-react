import {useQuery, useReactiveVar} from '@apollo/client';
import React from 'react';
import {useParams} from 'react-router';
import resolvers from '../../resolvers';
import ManageFriends from './ManageFriends/ManageFriends';
import {currentUserVar} from '../../cache';
import FollowUser from './ManageFriends/FollowStatus';
import {useMutation, useApolloClient} from '@apollo/client';

const profile = () => {
  const client = useApolloClient();
  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const currentUser = useReactiveVar(currentUserVar);
  const {id: paramId} = useParams<{id: string}>();

  const {error, loading, data: {returnUser: user} = {}} =
    useQuery(resolvers.queries.ReturnUser, {
      variables: {userId: parseInt(paramId)},
    });

  if (error) return (<div>error {error.message}</div>);
  if (loading) return (<div>loading... </div>);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
    client.cache.reset();
  };

  if (!user) return (<div>User not found</div>);

  const ProfileDashboad = () => {
    return (
      <>
        <ManageFriends />
        <p onClick={logout}>Logout</p>
      </>
    );
  };

  return (
    <div>
      <p>Profile {user.user_name}</p>
      {currentUser.id !== parseInt(paramId) && <FollowUser user={user} />}
      {currentUser.id == parseInt(paramId) && <ProfileDashboad/> }
    </div>
  );
};

export default profile;
