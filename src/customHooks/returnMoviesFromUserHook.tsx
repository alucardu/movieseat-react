import {useQuery} from '@apollo/client';
import resolvers from '../resolvers';
import {currentUserVar} from '../cache';

const returnMoviesFromUserHook = () => {
  const {error, loading, data} = useQuery(
      resolvers.queries.ReturnMoviesFromUser, {variables: {userId: currentUserVar().id}});
  if (!loading && !error) {
    return data.moviesFromUser;
  }
};

export default returnMoviesFromUserHook;

