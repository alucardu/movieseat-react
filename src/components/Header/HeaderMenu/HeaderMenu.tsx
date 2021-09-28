import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import resolvers from '../../../resolvers';
import {currentUserVar} from '../../../cache';
import Notifications from '../..//Notifications/Notifications';

const useStyles = makeStyles({
  profileIcon: {
    fontSize: '4rem',
  },

  profile: {
    'width': '10rem',
    'background': '#ff6a00',
    'right': 0,
    'top': '5rem',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '0.5rem',
    'boxShadow': '3px 3px 6px #000;',
    'zIndex': 1,
    '& a': {
      color: 'white',
      fontSize: '1rem',
      textDecoration: 'none',
    },
  },
});

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const classes = useStyles();

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    currentUserVar({id: 0, email: '', user_name: '', isLoggedIn: false});
  };

  const ShowMenu = () => {
    return (
      <div className={classes.profile}>
        <ul>
          <Notifications />
        </ul>
        <ul>
          <li><Link to={`/profile/${currentUserVar().id}`}>Profile</Link></li>
          <li><Link to='/' onClick={logout}>Logout</Link></li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <AccountCircleIcon className={classes.profileIcon} />
      </Button>
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
        <ShowMenu />
      </Popover>
    </div>
  );
};

export default HeaderMenu;
