import localforage from 'localforage';
import {orderBy} from 'lodash';
import {ISelectedSortType} from 'Src/movieseat';

const sortMovies = async (movies) => {
  const returnSortType = (movie, value) => {
    switch (value) {
      case 'release_date':
        return movie.release_date;
      case 'title':
        return movie.original_title;
    }
  };

  return await localforage.getItem<ISelectedSortType>('movieSort').then((sortValue) => {
    const sortData:ISelectedSortType = sortValue || {orderType: true, selectedSortType: 'release_date'};
    return orderBy(movies, [(movie) => returnSortType(movie, sortData.selectedSortType)], [sortData.orderType ? 'asc' : 'desc']);
  });
};

export default sortMovies;
