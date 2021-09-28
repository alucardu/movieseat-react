/* eslint-disable camelcase */
export interface IMovie {
  id: number
  original_title: string
  poster_path: string
  release_date: string
  backdrop_path: string
  tmdb_id: number
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
  Added_Movie = 'has added'
}
