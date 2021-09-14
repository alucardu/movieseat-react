/* eslint-disable require-jsdoc */
import React from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/Login';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  headerStyle: {
    background: '#0fcece',
    padding: '24px',
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
  const classes = useStyles();
  return (
    <header className={classes.headerStyle}>
      <Login />
      <Link to="/"><h1 className={classes.title}>Movieseat</h1></Link>
    </header>
  );
};

export default Header;
