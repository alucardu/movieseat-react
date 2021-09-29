/* eslint-disable require-jsdoc */
import React from 'react';
import {Link} from 'react-router-dom';
import Login from './Login/Login';
import {makeStyles} from '@material-ui/styles';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import NotificationsMenu from '../Notifications/NotificationsMenu';

import {useReactiveVar} from '@apollo/client';

import {currentUserVar} from '../../cache';

const useStyles = makeStyles({
  menuContainer: {
    display: 'flex',
  },
  headerStyle: {
    background: '#0fcece',
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '3.5em',
    color: '#fff',
    margin: 0,
    fontFamily: 'Oleo Script Swash Caps, cursive',
    textShadow: '2px 2px 5px #000',
  },
});

const Header = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const classes = useStyles();
  return (
    <header className={classes.headerStyle}>
      <Link to="/"><h1 className={classes.title}>Movieseat</h1></Link>
      {currentUser.isLoggedIn ?
        <div className={classes.menuContainer}><HeaderMenu /> <NotificationsMenu /></div> :
        <Login />}
    </header>
  );
};

export default Header;
