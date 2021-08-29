import {ReactiveVar, makeVar} from '@apollo/client';
import {IMovie} from './movieseat';

export const movieVar: ReactiveVar<IMovie> = makeVar({id: 1, original_title: '', backdrop_path: '', poster_path: '', release_date: '', tmdb_id: 1});
export const moviesVar: ReactiveVar<IMovie[]> = makeVar<IMovie[]>([]);
