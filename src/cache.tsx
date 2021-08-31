import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie, ICurrentUser} from './movieseat';

export const movieVar: ReactiveVar<IMovie> = makeVar({
  id: 0,
  original_title: '',
  backdrop_path: '',
  poster_path: '',
  release_date: '',
  tmdb_id: 0,
  userId: 0,
});

export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([
]);

export const currentUserVar: ReactiveVar<ICurrentUser> = makeVar<ICurrentUser>({
  id: 0,
  email: '',
  isLoggedIn: false,
});
