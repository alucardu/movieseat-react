import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import resolvers from '../../resolvers';
import {makeStyles} from '@material-ui/styles';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';


const useStyles = makeStyles({
  unwatched: {
    background: 'grey',
  },
  watched: {
    background: 'orange',
  },
});

const Notifications = () => {
  const classes = useStyles();
  const [watchNotificationRes] = useMutation(resolvers.mutations.WatchNotification);
  const {error, loading, data: {returnNotifications: notifications} = {}} =
    useQuery(resolvers.queries.ReturnNotifications);


  if (error) return (<p>error</p>);
  if (loading) return (<p>loading</p>);

  const watchNotification = (notification) => {
    console.log('watch notification ', notification);
    watchNotificationRes({
      variables: {notificationId: notification.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnNotifications: () => {
              return [...data.watchNotification];
            },
          },
        });
      },
    });
  };

  return (
    <div>notification
      <ul>
        {notifications.map((notification) => {
          return (
            <li key={notification.id}
              className={notification.watched ? classes.watched : classes.unwatched}>
              <p>{`
                ${notification.followedUser.user_name} 
                ${notification.action} 
                ${notification.movie.original_title} 
                to their watchlist.`
              }</p>
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

export default Notifications;
