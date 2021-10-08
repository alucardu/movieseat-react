import React, {useState, forwardRef} from 'react';
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import resolvers from '../../resolvers';
import {makeStyles} from '@mui/styles';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Popover from '@mui/material/Popover';
import {currentUserVar} from '../../cache';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {List, ListItemButton, Typography} from '@mui/material';
import {Box} from '@mui/system';

import ListItemIcon from '@mui/material/ListItemIcon';
import {} from 'react-router/node_modules/@types/react';
import {EAction} from '../../movieseat';

const useStyles = makeStyles({
  paperRoot: {
    left: '8px',
    top: '104px',
  },
  ListItemRoot: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'borderBottom': '1px solid #ebebeb',
    'height': '64px',
    '& p': {
      transition: 'margin-left 0.1s ease-in',
    },
    '&:hover': {
      'background': '#f6e0fa',
      '&> p': {
        marginLeft: '4px',
      },
    },
  },
  notificationCount: {
    borderRadius: '50%',
    background: 'purple',
    color: 'white',
    width: '1.5em',
    height: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '4em',
    bottom: '3em',
    fontWeight: 'bold',
    fontSize: '0.6rem',
  },
  profileIcon: {
    fontSize: '4rem',
  },
  unwatched: {
    background: '#e0e0e0',
  },
  watched: {
    background: '#ffffff',
  },
});

const NotificationsMenu = (props, ref) => {
  const classes = useStyles();
  const currentUser = useReactiveVar(currentUserVar);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    if (ref && 'current' in ref && ref.current) {
      setAnchorEl(ref.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [watchNotificationRes] = useMutation(resolvers.mutations.WatchNotification);
  const {error, loading, data: {returnNotifications: notifications} = {}} =
    useQuery(resolvers.queries.ReturnNotifications, {
      skip: currentUserVar().id === 0,
    });


  if (error) return (<p>error</p>);
  if (loading) return (<p>loading</p>);

  const watchNotification = (notification) => {
    watchNotificationRes({
      variables: {notificationId: notification.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnNotifications: () => {
              return [...data.watchNotification.returnNotifications];
            },
          },
        });
      },
    });
  };

  const returnNotification = (notification) => {
    switch (notification.action) {
      case EAction.Added_Movie:
        return <MovieNotification key={notification.id} notification={notification}/>;
      case EAction.Onboard:
        return <OnboardNotification key={notification.id} notification={notification} />;
      default:
        break;
    }
  };

  const OnboardNotification = ({notification}: any) => {
    return (
      <ListItem
        className={notification.watched ? classes.watched : classes.unwatched}
        classes={{root: classes.ListItemRoot}}
      >
        <Link to={`/profile/${notification.userId}`} onClick={handleClose}>
          <Typography variant='body2'>
            {notification.action}{' '}
          </Typography>
        </Link>
        { !notification.watched ?
          <IconButton onClick={() => {
            watchNotification(notification);
          }}>
            <CircleIcon color="primary"/>
          </IconButton> :
          null
        }
      </ListItem>
    );
  };

  const MovieNotification = (notification) => {
    return (
      <ListItem
        className={notification.watched ? classes.watched : classes.unwatched}
        classes={{root: classes.ListItemRoot}}
      >
        <Typography variant='body2'>
          <Link to={`/profile/${notification.followedUser.id}`} onClick={handleClose}>{notification.followedUser.user_name}</Link>{' '}
          {notification.action}{' '}
          {notification.movie.original_title}{' '}
          to their watchlist.
        </Typography>
        { !notification.watched ?
          <IconButton onClick={() => {
            watchNotification(notification);
          }}>
            <CircleIcon color="primary"/>
          </IconButton> :
          null
        }
      </ListItem>
    );
  };

  const ShowNotifications = () => {
    return (
      <Box>
        {notifications.returnNotifications.length > 0 ?
          <List sx={{maxWidth: '474px'}}>
            {notifications.returnNotifications.map((notification) => {
              return returnNotification(notification);
            })}
          </List> :
          <List>
            <ListItem sx={{width: '474px'}}>
              <Typography variant='body2'>
                No notifications
              </Typography>
            </ListItem>
          </List>
        }
      </Box>
    );
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton disabled={!currentUser.isLoggedIn} onClick={handleClick} >
          <ListItemIcon>
            <CircleNotificationsIcon fontSize='large'/>
          </ListItemIcon>
          {notifications?.unwatchedNotificationsCount ?
        <span className={classes.notificationCount}>
          {notifications?.unwatchedNotificationsCount}
        </span> :
        null
          }
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </ListItem >

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          root: classes.paperRoot,
        }}
      >
        <ShowNotifications />
      </Popover>
    </>
  );
};

export default forwardRef(NotificationsMenu);
