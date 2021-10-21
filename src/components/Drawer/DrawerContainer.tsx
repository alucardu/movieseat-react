import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';

import {useReactiveVar} from '@apollo/client';

import {styled, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

import {List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import {makeStyles} from '@mui/styles';

import {currentUserVar} from 'Src/cache';

import NotificationsMenu from 'Components/Notifications/NotificationsMenu';
import Login from 'Components/Login/Login';

const drawerWidth = 240;

const useStyles = makeStyles({
  logo: {
    'fontSize': '2em',
    'fontFamily': 'Oleo Script Swash Caps',
    'background': 'transparent',
    'border': 'none',
    'padding': 0,
    'width': '33px',
    'overflow': 'hidden',
    'textAlign': 'left',
    'transition': 'all 0.1s ease-out',
    'cursor': 'pointer',
    '&:hover': {
      color: 'coral',
    },
  },
  slide: {
    paddingLeft: '8px',
    width: '100%',
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

export const DrawerContainer = () => {
  const classes = useStyles();
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
        <ListItem>
          <Link data-cy='btn_home' to='/'><Box className={`${classes.logo} ${open ? classes.slide : null}`} component='button'>Movieseat</Box></Link>
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
