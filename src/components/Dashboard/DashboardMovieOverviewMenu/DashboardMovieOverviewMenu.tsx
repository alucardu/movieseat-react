  import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import ListIcon from '@material-ui/icons/List';
import SortMovieOverview from './SortMovieOverview/SortMovieOverview';

const MenuIcon = styled.div`
  margin: -48px 0 0 8px;
  position: absolute;
  svg {
    font-size: 2.5em;
    cursor: pointer;
  }
`

const MenuLayoutEL = styled.div`
  position: absolute;
  left: 12px;
  z-index: 1;
  background: #0fcece;
  width: 250px;
  color: #000;
  ul {
    padding: 0 12px 0 12px;
    list-style: none;
    li {
      div {
        display: flex;
      }
    }
  }
`
const MenuLayout = ( { toggleMenu } ) => {

  return (
    <MenuLayoutEL>
      <ul>
        <li>
          <SortMovieOverview toggleMenu={toggleMenu}/>
        </li>
      </ul>
    </MenuLayoutEL>
  )
}

const DashboardMovieOverviewMenu = () => {
  const [showMenu, toggleMenu] = useState(false);

  return (
    <React.Fragment>
      <MenuIcon><ListIcon onClick={() => toggleMenu(!showMenu)}/></MenuIcon>
      { showMenu ? <MenuLayout toggleMenu={toggleMenu}/> : null }
    </React.Fragment>
  )
}

export default DashboardMovieOverviewMenu;