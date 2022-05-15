import localforage from 'localforage';
import {orderBy, isEmpty} from 'lodash';

import {IMovie, ISelectedSortType} from 'Src/movieseat';

const sortMovies = async (movies: IMovie[]) => {
  const returnSortType = (movie, value) => {
    switch (value) {
      case 'release_date':
        return movie.release_date;
      case 'title':
        return movie.original_title;
    }
  };

  const filterMovies = (sortedMovies: IMovie[], empty: Boolean) => {
    return sortedMovies.filter((movie) => empty ?
      !isEmpty(movie.release_date) :
      isEmpty(movie.release_date));
  };

  return await localforage.getItem<ISelectedSortType>('movieSort').then((sortValue) => {
    const sortData:ISelectedSortType = sortValue || {orderType: true, selectedSortType: 'release_date'};
    let sortedMovies = orderBy(movies, [(movie) => returnSortType(movie, sortData.selectedSortType)], [sortData.orderType ? 'asc' : 'desc']);
    const moviesWithReleaseDate = filterMovies(sortedMovies, true);
    const moviesWithoutReleaseDate = filterMovies(sortedMovies, false);

    if (sortData.selectedSortType === 'release_date') {
      sortedMovies = sortData.orderType ?
        [...moviesWithReleaseDate, ...moviesWithoutReleaseDate] :
        [...moviesWithoutReleaseDate, ...moviesWithReleaseDate];
    }
    return sortedMovies;
  });
};

export default sortMovies;
