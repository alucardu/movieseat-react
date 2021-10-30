import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';

import {useReactiveVar} from '@apollo/client';

import {List, ListItem, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Divider from '@mui/material/Divider';

import {Drawer} from 'Src/styles';
import {Logo} from 'Src/styles';
import {currentUserVar} from 'Src/cache';

import NotificationsMenu from 'Components/Notifications/NotificationsMenu';
import Login from 'Components/Login/Login';

export const DrawerContainer = () => {
  const elRef = useRef(null);
  const currentUser = useReactiveVar(currentUserVar);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const drawerItems = [
    {
      text: 'Toggle',
      icon: <MenuIcon fontSize='large'/>,
      callback: handleToggle,
    },
    {
      component: <NotificationsMenu ref={elRef}/>,
    },
    {
      text: 'Profile',
      icon: <AccountCircleIcon fontSize='large'/>,
      link: `/profile/${currentUserVar().id}`,
      dataCy: 'btn_account',
    },
    {
      component: <Login/>,
    },
    {
      component: <Divider/>,
    },
    {
      text: 'Watchlist',
      icon: <LocalMoviesIcon fontSize='large'/>,
      link: '/',
      dataCy: 'btn_watchlist',
    },
    {
      text: 'Suggestions',
      icon: <MovieFilterIcon fontSize='large'/>,
      link: '/suggestions',
      dataCy: 'btn_suggestions',
    },
  ];

  return (
    <Drawer variant="permanent" open={open} ref={elRef}>
      <List>
        <ListItem disablePadding>
          <Link data-cy='btn_home' to='/'>
            <Logo
              component='button'
              className={`${open ? 'open' : null}`}
            >Movieseat</Logo>
          </Link>
        </ListItem>
        {drawerItems.map((drawerItem, i) => {
          return (
            drawerItem.component ? <div key={i}>{drawerItem.component}</div> :
            <ListItem key={i} disablePadding data-cy={drawerItem.dataCy}>
              <ListItemButton disabled={!currentUser.isLoggedIn} component='a' href={drawerItem.link} onClick={drawerItem.callback}>
                <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                <ListItemText primary={drawerItem.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
