import React from 'react';
import {Link} from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import {drawerOpenVar} from 'Src/cache';
import {IconButton, Box} from '@mui/material';

import {HeaderStyle, Logo} from 'Src/styles';
import {currentUserVar} from 'Src/cache';
import {NumberOfUnreadNotifications} from 'Components/Notifications/NumberOfUnreadNotifications';

const Header = () => {
  const handleClick = () => {
    drawerOpenVar(true);
  };

  return (
    <HeaderStyle>
      <Box sx={{width: '25%'}}></Box>
      <Link to='/' style={{width: '50%'}}>
        <Logo
          component='button'
          className='open'
        >Movieseat
        </Logo>
      </Link>
      <IconButton
        disabled={!currentUserVar().isLoggedIn}
        onClick={handleClick}
        sx={{color: 'white', width: '25%'}}
      >
        <NumberOfUnreadNotifications />
        <MenuIcon
          sx={{marginLeft: 'auto'}}
          fontSize='large'
        />
      </IconButton>
    </HeaderStyle>

  );
};

export default Header;

