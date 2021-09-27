import React from 'react';
import {useQuery} from '@apollo/client';
import resolvers from '../../resolvers';

const Notifications = () => {
  const {error, loading, data: {returnNotifications: notifications} = {}} = useQuery(resolvers.queries.ReturnNotifications);


  if (error) return (<p>error</p>);
  if (loading) return (<p>loading</p>);

  console.log(notifications);

  return (
    <div>notification
      <ul>
        {notifications.map((notification) => {
          return (
            <li key={notification.id}>
              {notification.message}
            </li>
          );
        })}

      </ul>
    </div>

  );
};

export default Notifications;
