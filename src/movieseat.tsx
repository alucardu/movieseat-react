export interface IMovie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  tmdb_id: number;
}

export interface ICurrentUser {
  id: number,
  email: string;
  isLoggedIn: boolean;
}

export interface IMovieList {
}

export interface ISortConfig {
  selectedSortType: string,
  orderType: string
}

export interface ISelectedSortType {
  selectedSortType: string;
  orderType: boolean;
}
