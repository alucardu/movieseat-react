import React, {useState} from 'react';
import {styled, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import NotificationsMenu from '../Notifications/NotificationsMenu';
import {currentUserVar} from '../../cache';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

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
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  console.log(currentUserVar().id == 0);

  const drawerItems = [
    {
      text: 'Toggle',
      icon: <MenuIcon fontSize='large'/>,
      callback: handleToggle,
    },
    {
      text: 'Notifications',
      icon: <CircleNotificationsIcon fontSize='large'/>,
      component: <NotificationsMenu/>,
    },
    {
      text: 'Profile',
      icon: <AccountCircleIcon fontSize='large'/>,
      link: `/profile/${currentUserVar().id}`,
    },
    {
      component: <Divider/>,
    },
    {
      text: 'Watchlist',
      icon: <LocalMoviesIcon fontSize='large'/>,
      link: '/',
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <List>
        {drawerItems.map((drawerItem, i) => {
          return (
            drawerItem.component ? <div key={i}>{drawerItem.component}</div> :
            <ListItem key={i} disablePadding>
              <ListItemButton disabled={currentUserVar().id === 0} component='a' href={drawerItem.link} onClick={drawerItem.callback}>
                <ListItemIcon>
                  {drawerItem.icon}
                </ListItemIcon>
                <ListItemText primary={drawerItem.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
