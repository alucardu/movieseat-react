import {useQuery} from '@apollo/client';
import resolvers from '../resolvers';

const returnLoggedInUserHook = (id) => {
  const {error, loading, data} = useQuery(
      resolvers.queries.ReturnCurrentUser, {variables: {id: id}});
  if (!loading && !error) {
    return data.currentUser;
  }
};

export default returnLoggedInUserHook;

