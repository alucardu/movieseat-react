import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import resolvers from '../../resolvers';
import {makeStyles} from '@material-ui/styles';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  notificationCount: {
    borderRadius: '50%',
    background: 'red',
    width: '2em',
    height: '2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '3.5em',
    bottom: '0.5em',
  },

  profileIcon: {
    fontSize: '4rem',
  },
  unwatched: {
    background: 'grey',
  },
  watched: {
    background: 'orange',
  },
});

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const classes = useStyles();
  const [watchNotificationRes] = useMutation(resolvers.mutations.WatchNotification);
  const {error, loading, data: {returnNotifications: notifications} = {}} =
    useQuery(resolvers.queries.ReturnNotifications);


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

  const ShowNotifications = () => {
    return (
      <div>
        notification
        <ul>
          {notifications.returnNotifications.map((notification) => {
            return (
              <li key={notification.id}
                className={notification.watched ? classes.watched : classes.unwatched}>
                <p>{<>
                  <Link to={`/profile/${notification.followedUser.id}`} onClick={handleClose}>{notification.followedUser.user_name}</Link>{' '}
                  {notification.action}{' '}
                  {notification.movie.original_title}{' '}
                    to their watchlist.
                </>}</p>
                { notification.watched ||
                  <IconButton onClick={() => {
                    watchNotification(notification);
                  }}>
                    <CircleIcon color="primary"/>
                  </IconButton>
                }
              </li>
            );
          })}

        </ul>
      </div>
    );
  };

  return (
    <div>
      <Button onClick={handleClick}>
        {notifications.unwatchedNotificationsCount ?
          <span className={classes.notificationCount}>
            {notifications.unwatchedNotificationsCount}
          </span> :
          null
        }
        <CircleNotificationsIcon className={classes.profileIcon} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ShowNotifications />
      </Popover>
    </div>
  );
};

export default NotificationsMenu;
