import {useQuery} from '@apollo/client';
import resolvers from '../resolvers';
import {currentUserVar} from '../cache';

const returnMoviesFromUserHook = () => {
  console.log('return movie');
  const {error, loading, data} = useQuery(
      resolvers.queries.ReturnMoviesFromUser, {variables: {userId: currentUserVar().id}});
  console.log(loading, error);
  if (!loading && !error) {
    return data.moviesFromUser;
  }
};

export default returnMoviesFromUserHook;

