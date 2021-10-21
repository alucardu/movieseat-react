import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useApolloClient, useMutation, useReactiveVar} from '@apollo/client';

import {ListItemButton, Popover, ListItem} from '@mui/material';
import {makeStyles} from '@mui/styles';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar} from 'Src/cache';

import {LoginForm} from 'Components/Login/LoginForm';

const useStyles = makeStyles(() => ({
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customPaper: {
    backgroundColor: 'transparent',
  },
}));

const Login = () => {
  const history = useHistory();
  const currentUser = useReactiveVar(currentUserVar);
  const client = useApolloClient();
  const classes = useStyles();
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
    currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
    history.push('/');
    snackbarVar({message: 'You have been logged out', severity: 'success'});
    client.cache.reset();
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

        <ListItemButton onClick={handleClick} >
          <ListItemIcon>
            <LoginIcon fontSize='large'/>
          </ListItemIcon>
          <ListItemText data-cy="btn_login" primary="Login" />
        </ListItemButton>
      }

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

        anchorReference='none'
        classes={{
          root: classes.popoverRoot,
          paper: classes.customPaper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LoginForm onRequestClose={handleClose}/>
      </Popover>

    </ListItem >
  );
};

export default Login;
