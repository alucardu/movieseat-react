export interface IMovie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
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
