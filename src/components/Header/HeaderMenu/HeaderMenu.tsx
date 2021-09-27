import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
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
    'position': 'absolute',
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
  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const classes = useStyles();
  const [showProfile, setShowProfile] = useState(false);

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
    <IconButton onClick={() => {
      setShowProfile(!showProfile);
    }}>
      <AccountCircleIcon className={classes.profileIcon} />
      {showProfile ? <ShowMenu /> : null}
    </IconButton>
  );
};

export default HeaderMenu;
