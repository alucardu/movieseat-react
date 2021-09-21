import {useQuery} from '@apollo/client';
import React from 'react';
import {useParams} from 'react-router';
import resolvers from '../../resolvers';

const profile = () => {
  const {id} = useParams<{id: string}>();
  const {error, loading, data: {returnUser: user} = {}} =
    useQuery(resolvers.queries.ReturnUser, {
      variables: {userId: parseInt(id)},
    });

  if (error) return (<div>error {error.message}</div>);
  if (loading) return (<div>loading... </div>);


  return (
    <div>
      { user ?
        <p>Profile {user.user_name}</p> :
        <div>User not found</div> }
    </div>
  );
};

export default profile;
