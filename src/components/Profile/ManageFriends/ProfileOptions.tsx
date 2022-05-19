import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useMutation, useApolloClient, useReactiveVar} from '@apollo/client';

import {Box, Button, Typography, Popover, IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {ProfileBox} from 'Src/styles';
import {currentUserVar, snackbarVar} from 'Src/cache';
import resolvers from 'Src/resolvers';

export const ProfileOptions = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        client.cache.reset();
      } else {
        snackbarVar({message: 'Your account has not been removed', severity: 'error'});
      }
    });
  };

  return (
    <ProfileBox>
      <Button>{currentUser.user_name}</Button>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={handleClick} data-cy='btn_remove_account'>Remove account</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          <Typography>Are you sure you want to remove your account?</Typography>
          <IconButton data-cy='btn_confirm_remove_account' onClick={removeAccount}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Popover>
    </ProfileBox>
  );
};
