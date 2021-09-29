import {useMutation} from '@apollo/client';
import resolvers from '../resolvers';
import {INotification} from '../movieseat';

export const useCreateNotification = () => {
  const [createNotification,
    {data, loading, error}] = useMutation(resolvers.mutations.CreateNotification);

  const handleCreateNotification = async (notification: INotification) => {
    if (notification.movie) {
      await createNotification({
        variables: {
          movieId: notification.movie.id,
          followedUserId: notification.user.id,
          action: notification.action,
        },
      });
    }
  };

  return {
    createNotification: handleCreateNotification,
    result: data,
    isLoading: loading,
    error,
  };
};
