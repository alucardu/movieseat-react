import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  background: #0fcece;
  padding: 24px;
`
const Title = styled.h1`
  font-size: 3.5em;
  color: #fff;
  margin: 0;
  font-family: 'Oleo Script Swash Caps', cursive;
  text-shadow: 2px 2px 5px #000;
`;

class Header extends React.Component {

  render() {
    return (
      <HeaderStyle>
        <Title>Movieseat</Title>
      </HeaderStyle>
    )
  }
}

export default Header;
