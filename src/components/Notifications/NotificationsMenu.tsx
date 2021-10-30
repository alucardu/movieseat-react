import React, {useState, forwardRef} from 'react';
import {Link} from 'react-router-dom';

import {useMutation, useQuery, useReactiveVar} from '@apollo/client';

import {IconButton, Box, ListItemText, ListItem, List, ListItemButton, Typography} from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';

import {NotificationMenu, NumberOfUnreadNotificationsStyle} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {currentUserVar} from 'Src/cache';
import {EAction} from 'Src/movieseat';

const NotificationsMenu = (props, ref) => {
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
      case EAction.Added_Rating:
        return <RatingNotification key={notification.id} notification={notification} />;
      default:
        break;
    }
  };

  const OnboardNotification = ({notification}: any) => {
    return (
      <ListItem
        className={notification.watched ? 'watched' : ''}
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

  if (error) return (<p>error</p>);
  if (loading) return (<p>loading</p>);

  const RatingNotification = (notification) => {
    return (
      <ListItem
        className={notification.notification.watched ? 'watched' : ''}
      >
        <Typography variant='body2'>
          <Link to={`/profile/${notification.notification.user.id}`} onClick={handleClose}>{notification.notification.user.user_name}</Link>{' '}
          {notification.notification.action}{' '}
          {notification.notification.movie.original_title}{' with a '}
          <b>{notification.notification.movieRating.value}</b>

        </Typography>
        { !notification.notification.watched ?
          <IconButton onClick={() => {
            watchNotification(notification.notification);
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
        className={notification.notification.watched ? 'watched' : ''}
      >
        <Typography variant='body2'>
          <Link to={`/profile/${notification.notification.user.id}`} onClick={handleClose}>{notification.notification.user.user_name}</Link>{' '}
          {notification.notification.action}{' '}
          {notification.notification.movie.original_title}{' '}
          to their watchlist.
        </Typography>
        { !notification.notification.watched ?
          <IconButton onClick={() => {
            watchNotification(notification.notification);
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
        {notifications?.returnNotifications.length > 0 ?
          <List sx={{maxWidth: '474px'}} data-cy='list_notifications'>
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

  const NumberOfUnreadNotifications = () => {
    return (
      <NumberOfUnreadNotificationsStyle>
        {notifications?.unwatchedNotificationsCount ?
          <span data-cy='notification_count'>
            {notifications?.unwatchedNotificationsCount}
          </span> :
          null
        }
      </NumberOfUnreadNotificationsStyle>
    );
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton disabled={!currentUser.isLoggedIn} onClick={handleClick} data-cy='btn_open_notifications'>
          <ListItemIcon>
            <CircleNotificationsIcon fontSize='large'/>
          </ListItemIcon>
          <NumberOfUnreadNotifications />
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </ListItem >

      <NotificationMenu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ShowNotifications />
      </NotificationMenu>
    </>
  );
};

export default forwardRef(NotificationsMenu);
