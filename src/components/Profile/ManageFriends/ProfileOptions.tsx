import React, {useState} from 'react';

import {useMutation, useApolloClient} from '@apollo/client';
import {Box} from '@mui/system';
import {currentUserVar, snackbarVar} from '../../../cache';
import resolvers from '../../../resolvers';
import {useHistory} from 'react-router-dom';
import {Button, Typography} from '@mui/material';
import {Popover, IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const ProfileOptions = () => {
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
      } else {
        snackbarVar({message: 'Your account has not been removed', severity: 'error'});
      }
    });
  };

  return (
    <Box className='profileBox'>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={handleClick}>Remove account</Button>
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
        <Box sx={{padding: '16px'}}>
          <Typography>Are you sure you want to remove your account?</Typography>
          <IconButton onClick={removeAccount}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Popover>
    </Box>
  );
};
