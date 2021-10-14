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
          userId: notification.user.id,
          movieId: notification.movie?.id,
          action: notification.action,
        },
      });
    }

    if (notification.action === EAction.Added_Rating) {
      await createNotification({
        variables: {
          userId: notification.user.id,
          movieId: notification.movie?.id,
          followedUserId: notification.user.id,
          action: notification.action,
          movieRatingId: notification.movieRating?.id,
        },
      });
    }

    if (notification.action === EAction.Onboard) {
      await createNotification({
        variables: {
          userId: notification.user.id,
          action: notification.action,
        },
        update: (cache, {data}) => {
          cache.modify({
            fields: {
              returnNotifications: () => {
                return [...data.createNotification.returnNotifications];
              },
            },
          });
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
