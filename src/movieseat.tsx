/* eslint-disable camelcase */
export interface IMovie {
  id: number
  original_title: string
  poster_path: string
  release_date: string
  backdrop_path: string
  overview: string
  tmdb_id: number
  tagline: string
  runtime: number
}

export interface IMovieRating {
  id: number
}

export interface ICurrentUser {
  id: number
  email: string
  user_name: string
  isLoggedIn: boolean
}

export interface INotification {
  action: string
  user: IUser
  movie?: IMovie
  movieRating?: IMovieRating
}

export interface IUser {
  id: number
  email: string
  user_name: string
}

export interface IMovieList {
}

export interface ISortConfig {
  selectedSortType: string
  orderType: string
}

export interface ISelectedSortType {
  selectedSortType: string
  orderType: boolean
}

export interface ISnackbar {
  severity: string
  message: string
}

export enum EAction {
  Onboard = 'Start following some users!',
  Added_Movie = 'has added',
  Added_Rating = 'has rated',
}
