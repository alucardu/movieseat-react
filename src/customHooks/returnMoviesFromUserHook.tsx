import {useQuery} from '@apollo/client';
import resolvers from '../resolvers';
import {currentUserVar} from '../cache';
import {IMovie} from '../movieseat';
import sortMovies from '../helpers/sortMovies';

let movies: IMovie[];

const returnMoviesFromUserHook = async () => {
  const {error, loading, data} = useQuery(
      resolvers.queries.ReturnMoviesFromUser, {
        fetchPolicy: 'no-cache',
        variables: {userId: currentUserVar().id},
        skip: currentUserVar().id === 0,
      });
  if (!loading && !error && data) {
    movies = await sortMovies(data.moviesFromUser);
  }
  return movies;
};

export default returnMoviesFromUserHook;

