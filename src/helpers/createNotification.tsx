import {useMutation} from '@apollo/client';
import resolvers from '../resolvers';
import {INotification, EAction} from '../movieseat';

export const useCreateNotification = () => {
  const [createNotification,
    {data, loading, error}] = useMutation(resolvers.mutations.CreateNotification);

  const handleCreateNotification = async (notification: INotification) => {
    if (notification.action === EAction.Added_Movie) {
      await createNotification({
        variables: {
          movieId: notification.movie?.id,
          followedUserId: notification.user.id,
          action: notification.action,
        },
      });
    }

    if (notification.action === EAction.Onboard) {
      await createNotification({
        variables: {
          userId: notification.user.id,
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
