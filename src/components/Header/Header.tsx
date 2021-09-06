/* eslint-disable require-jsdoc */
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Login from '../Login/Login';

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
  return (
    <HeaderStyle>
      <Login />
      <Link to="/"><Title>Movieseat</Title></Link>
    </HeaderStyle>
  );
};

export default Header;
