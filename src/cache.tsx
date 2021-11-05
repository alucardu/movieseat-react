import {InMemoryCache, ReactiveVar, makeVar} from '@apollo/client';
import {IMovie, ICurrentUser, ISelectedSortType, ISnackbar} from 'Src/movieseat';

export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);
export const movieSearchResultsVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);
export const movieSearchActiveVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const sortVar: ReactiveVar<ISelectedSortType> = makeVar<ISelectedSortType>({selectedSortType: 'title', orderType: true});

export const snackbarVar: ReactiveVar<ISnackbar> = makeVar<ISnackbar>({message: '', severity: 'warning'});

export const drawerOpenVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const currentUserVar: ReactiveVar<ICurrentUser> = makeVar<ICurrentUser>({
  id: 0,
  email: '',
  user_name: '',
  isLoggedIn: false,
});

export const a2hsVar = makeVar<boolean>(true);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        a2hs: {
          read() {
            return a2hsVar();
          },
        },
      },
    },
  },
});
