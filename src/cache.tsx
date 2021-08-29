import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie} from './movieseat';

export const movieVar: ReactiveVar<IMovie> = makeVar<IMovie>({id: 1, original_title: '', backdrop_path: '', poster_path: '', release_date: ''});
