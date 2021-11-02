import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import {drawerOpenVar} from 'Src/cache';
import {IconButton} from '@mui/material';

import {HeaderStyle, Logo} from 'Src/styles';

const Header = () => {
  const handleClick = () => {
    drawerOpenVar(true);
  };

  return (
    <HeaderStyle>
      <Logo
        component='button'
        className='open'
      >Movieseat</Logo>
      <IconButton
        onClick={handleClick}
        sx={{color: 'white'}}
      >
        <MenuIcon
          fontSize='large'
        />
      </IconButton>
    </HeaderStyle>

  );
};

export default Header;

