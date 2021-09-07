import {useQuery} from '@apollo/client';
import resolvers from '../resolvers';
import {currentUserVar} from '../cache';

const returnMoviesFromUserHook = () => {
  const {error, loading, data} = useQuery(
      resolvers.queries.ReturnMoviesFromUser, {
        fetchPolicy: 'no-cache',
        variables: {userId: currentUserVar().id},
        skip: currentUserVar().id === 0,
      });
  if (!loading && !error && data) {
    return data.moviesFromUser;
  }
};

export default returnMoviesFromUserHook;

