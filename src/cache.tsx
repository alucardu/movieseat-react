import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie, ICurrentUser, ISelectedSortType, ISnackbar} from 'Src/movieseat';

export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);

export const sortVar: ReactiveVar<ISelectedSortType> = makeVar<ISelectedSortType>({selectedSortType: 'title', orderType: true});

export const snackbarVar: ReactiveVar<ISnackbar> = makeVar<ISnackbar>({message: '', severity: 'warning'});

export const drawerOpenVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const currentUserVar: ReactiveVar<ICurrentUser> = makeVar<ICurrentUser>({
  id: 0,
  email: '',
  user_name: '',
  isLoggedIn: false,
});
