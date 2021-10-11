import React, {useState, useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';
import {IUser} from '../../../movieseat';
import {currentUserVar, snackbarVar} from '../../../cache';
import {Box} from '@mui/system';
import {Button} from '@mui/material';

const FollowStatus = ({user}: {user: IUser}) => {
  const [userIsFollowed, setUserIsFollowed] = useState(false);
  const [followUserMutation] = useMutation(resolvers.mutations.FollowUser);
  const [unfollowUserMutation] = useMutation(resolvers.mutations.UnfollowUser);

  const {error, loading, data: {returnFollowedUsers: followedUsers} = {}} =
  useQuery(resolvers.queries.ReturnFollowedUsers, {
    variables: {userId: currentUserVar().id},
  });

  useEffect(() => {
    let value = false;
    if (!followedUsers) return;
    followedUsers.map((followedUser) => {
      if (followedUser.id === user.id) value = true;
    });

    setUserIsFollowed(value);
  }, [followedUsers]);

  if (error) return (<div>error</div>);
  if (loading) return (<div>loading</div>);

  const unfollowUser = async () => {
    await unfollowUserMutation({
      variables: {id: user.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnFollowedUsers: () => {
              return [...data.unfollowUser];
            },
          },
        });
      },
    }).then(() => {
      snackbarVar({message: 'Unfollowed ' + user.user_name, severity: 'success'});
    });
  };

  const followUser = async () => {
    await followUserMutation({
      variables: {userId: user.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnFollowedUsers: () => {
              return [...data.followUser];
            },
          },
        });
      },
    }).then(() => {
      snackbarVar({message: 'Following ' + user.user_name, severity: 'success'});
    });
  };

  return (
    <Box className='profileBox' sx={{maxWidth: 'fit-content'}}>
      {userIsFollowed ?
      <Button data-cy='btn_unfollow_user' onClick={unfollowUser}>Unfollow {user.user_name}</Button> :
      <Button data-cy='btn_follow_user' onClick={followUser}>Follow {user.user_name}</Button>}
    </Box>
  );
};

export default FollowStatus;
