import React from 'react';
import {useMutation} from '@apollo/client';

import resolvers from '../resolvers';

const createNotification = (message) => {
  const [createNotification] = useMutation(resolvers.mutations.CreateNotification);

  const someFunction = async () => {
    console.log('z');
    await createNotification({}).then((res) => {
      console.log('res: ', res);
    });
  };

  console.log('q: ', message);

  someFunction();

  return (<div>asd</div>);
};

export default createNotification;
