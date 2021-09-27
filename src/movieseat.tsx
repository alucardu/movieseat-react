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
  message: string
  icon?: string
  thumbnail?: string
  watched: boolean
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
