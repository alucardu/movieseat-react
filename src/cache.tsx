import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie, ICurrentUser, ISelectedSortType, ISnackbar, INotification} from './movieseat';

export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);

export const sortVar: ReactiveVar<ISelectedSortType> = makeVar<ISelectedSortType>({selectedSortType: 'title', orderType: true});

export const snackbarVar: ReactiveVar<ISnackbar> = makeVar<ISnackbar>({message: '', severity: 'warning'});

export const notificationVar: ReactiveVar<INotification> = makeVar<INotification>({message: '', icon: '', thumbnail: '', watched: false});

export const currentUserVar: ReactiveVar<ICurrentUser> = makeVar<ICurrentUser>({
  id: 0,
  email: '',
  user_name: '',
  isLoggedIn: false,
});
