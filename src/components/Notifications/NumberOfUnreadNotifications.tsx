import React from 'react';

import {useQuery} from '@apollo/client';

import {currentUserVar} from 'Src/cache';
import {NumberOfUnreadNotificationsStyle} from 'Src/styles';
import resolvers from 'Src/resolvers';

export const NumberOfUnreadNotifications = () => {
  const {error, loading, data: {returnNotifications: notifications} = {}} =
  useQuery(resolvers.queries.ReturnNotifications, {
    skip: currentUserVar().id === 0,
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;

  return (
    <>
      {notifications?.unwatchedNotificationsCount > 0 ?
        <NumberOfUnreadNotificationsStyle className='notification_count'>
          <span data-cy='notification_count'>
            {notifications?.unwatchedNotificationsCount}
          </span>
        </NumberOfUnreadNotificationsStyle>: null
      }
    </>
  );
};
