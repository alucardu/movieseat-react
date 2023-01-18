import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useReactiveVar} from '@apollo/client';

import {List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {Drawer} from 'Src/styles';
import {Logo} from 'Src/styles';
import {currentUserVar, drawerOpenVar} from 'Src/cache';

import Filters from 'Components/Filters/Filters';
import NotificationsMenu from 'Components/Notifications/NotificationsMenu';
import Login from 'Components/Login/Login';
import DashboardMovieOverviewMenu from 'Components/Dashboard/DashboardMovieOverviewMenu/DashboardMovieOverviewMenu';

export const DrawerContainer = () => {
  const theme = useTheme();
  const elRef = useRef(null);
  const currentUser = useReactiveVar(currentUserVar);
  const drawerStatus = useReactiveVar(drawerOpenVar);
  const [open, setOpen] = useState(false);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    setOpen(drawerStatus);
  }, [drawerStatus]);

  const handleToggle = () => {
    setOpen(!open);
    drawerOpenVar(false);
  };

  const drawerItems = [
    {
      text: 'Toggle',
      icon: <MenuIcon fontSize='large'/>,
      callback: handleToggle,
      hideMobile: !isMdUp,
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
      component: <DashboardMovieOverviewMenu ref={elRef}/>,
    },
    {
      component: <Filters ref={elRef}/>,
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
    <>
      <Drawer
        ref={elRef}
        open={open}
        onClose={handleToggle}
        variant={isMdUp ? 'permanent' : 'temporary'}
      >
        <List>
          <ListItem
            disablePadding
            sx={{display: !isMdUp ? 'none' : null}}
          >
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
            <ListItem
              key={i}
              disablePadding
              data-cy={drawerItem.dataCy}
              sx={{display: drawerItem.hideMobile ? 'none' : null}}
            >
              <ListItemButton disabled={!currentUser.isLoggedIn} component='a' href={drawerItem.link} onClick={drawerItem.callback}>
                <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                <ListItemText primary={drawerItem.text} />
              </ListItemButton>
            </ListItem>
            );
          })}
        </List>
        <Box sx={{
          marginTop: 'auto',
          padding: '1rem',
          fontSize: '0.7rem',
          color: '#c9c8c8',
        }}>v 0.1.7</Box>
      </Drawer>
    </>
  );
};
