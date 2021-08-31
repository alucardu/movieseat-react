/* eslint-disable require-jsdoc */
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useReactiveVar} from '@apollo/client';
import {currentUserVar} from '../../cache';
import Login from '../Login/Login';
import {Route} from 'react-router-dom';

const HeaderStyle = styled.header`
  background: #0fcece;
  padding: 24px;
`;
const Title = styled.h1`
  font-size: 3.5em;
  color: #fff;
  margin: 0;
  font-family: 'Oleo Script Swash Caps', cursive;
  text-shadow: 2px 2px 5px #000;
`;

const Header = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    currentUserVar({id: 0, email: '', isLoggedIn: false});
  };

  return (
    <HeaderStyle>
      <Route path="/login" exact component={Login} />
      <Link to="/"><Title>Movieseat</Title></Link>
      { currentUser.isLoggedIn ? <a href="" onClick={logout}>Logout</a> : <Link to="/login">login</Link> }
    </HeaderStyle>
  );
};

export default Header;
