import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie, ICurrentUser} from './movieseat';

export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);

export const currentUserVar: ReactiveVar<ICurrentUser> = makeVar<ICurrentUser>({
  id: 0,
  email: '',
  isLoggedIn: false,
});
