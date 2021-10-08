import React from 'react';

import {useMutation, useApolloClient} from '@apollo/client';
import {Box} from '@mui/system';
import {currentUserVar, snackbarVar} from '../../../cache';
import resolvers from '../../../resolvers';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';

export const ProfileOptions = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const [removeUserAccount] = useMutation(resolvers.mutations.removeUserAccount);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
    history.push('/');
    snackbarVar({message: 'You have been logged out', severity: 'success'});
    client.cache.reset();
  };

  const removeAccount = () => {
    removeUserAccount({variables: {userId: currentUserVar().id}}).then((res) => {
      if (res.data.removeUserAccount) {
        currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
        history.push('/');
        snackbarVar({message: 'Your account has been removed', severity: 'success'});
      } else {
        snackbarVar({message: 'Your account has not been removed', severity: 'error'});
      }
    });
  };

  return (
    <Box className='profileBox'>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={removeAccount}>Remove account</Button>
    </Box>
  );
};
