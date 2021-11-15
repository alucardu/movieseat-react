import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useApolloClient, useMutation, useReactiveVar} from '@apollo/client';

import {ListItemButton, ListItem, Box} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {LoginModal} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar, drawerOpenVar} from 'Src/cache';

import {LoginForm} from 'Components/Login/LoginForm';

const Login = () => {
  const history = useHistory();
  const currentUser = useReactiveVar(currentUserVar);
  const client = useApolloClient();
  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    client.cache.reset();
    client.resetStore();
    history.push('/');
    currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
    drawerOpenVar(false);
    snackbarVar({message: 'You have been logged out', severity: 'success'});
  };

  return (
    <ListItem disablePadding>
      {currentUser.isLoggedIn ?
        <ListItemButton onClick={logout} >
          <ListItemIcon>
            <LogoutIcon fontSize='large'/>
          </ListItemIcon>
          <ListItemText data-cy="btn_logout" primary="Logout" />
        </ListItemButton> :

        <ListItemButton disabled={!currentUser.isLoggedIn} onClick={handleClick} >
          <ListItemIcon>
            <LoginIcon fontSize='large'/>
          </ListItemIcon>
          <ListItemText data-cy="btn_login" primary="Login" />
        </ListItemButton>
      }

      <LoginModal
        id={id}
        open={open}
        onClose={handleClose}
      >
        <Box>
          <LoginForm onRequestClose={handleClose}/>
        </Box>
      </LoginModal>

    </ListItem >
  );
};

export default Login;
