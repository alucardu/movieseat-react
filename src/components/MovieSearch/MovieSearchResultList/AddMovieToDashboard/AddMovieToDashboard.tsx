import React, {useEffect, useState, useRef, useContext} from 'react';
import styled from 'styled-components';
import localforage from 'localforage';
import {orderBy} from 'lodash';
import {useSnackbar} from 'notistack';
import {IMovie, ISortConfig} from '../../../../movieseat';
import {MovieContext} from '../../../../context/MovieContext';

const backdropUrl = 'https://image.tmdb.org/t/p/w780';

interface OverlayData {
  readonly backdropPath: string;
}
const Overlay = styled.div<OverlayData>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background: ${(movie) => movie.backdropPath ?
    `url(${backdropUrl + movie.backdropPath} ) no-repeat center center` : null};
  background-size: cover;
  div {
    background: #00000073;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AddMovie = styled.a`
  padding: 8px;
  background: #0fcece;
  border-radius: 12px;
`;

const AddMovieToWatchList = ({movie}: {movie: IMovie}) => {
  const {enqueueSnackbar} = useSnackbar();

  const [trackedMovies, setTrackedMovies] = useState<IMovie[]>([]);
  const [sortConfig, setSortConfig] = useState(
      {selectedSortType: '', orderType: ''},
  );
  const isMountedRef = useRef(true);

  useEffect( () => {
    localforage.getItem<ISortConfig>('sortType').then((value) => {
      if (isMountedRef.current && value) {
        setSortConfig(value);
      }
    });
    localforage.getItem<IMovie []>('trackedMovies').then((value) => {
      if (isMountedRef.current && value) {
        setTrackedMovies(value);
      }
    });
  }, []);

  const [, setMovies] = useContext(MovieContext);

  const addMovie = async (movie: IMovie) => {
    if (!checkForDuplicate(trackedMovies, movie)) {
      addMovieToLocalStorage(movie);

      const sortedTrackedMovies = orderBy(trackedMovies, [(movie: IMovie) =>
        returnSortType(movie, sortConfig.selectedSortType)], [sortConfig.orderType ? 'asc' : 'desc'],
      );
      setMovies(sortedTrackedMovies);

      enqueueSnackbar(
          'Added ' + movie.original_title + ' to your watchlist.',
          {variant: 'success'});
    } else {
      enqueueSnackbar(
          'Movie ' + movie.original_title + ' is already on your watchlist.',
          {variant: 'error'},
      );
    }
  };

  const returnSortType = (movie, selectedSortType) => {
    switch (selectedSortType) {
      case 'release_date':
        return movie.release_date;
      case 'title':
        return movie.title;
    }
  };

  const checkForDuplicate = (trackedMovies, movie) => {
    for (const item of trackedMovies) {
      if (item.id === movie.id) return true;
    }
  };

  const addMovieToLocalStorage = async (movie: IMovie) => {
    trackedMovies.push(movie);
    const sortedTrackedMovies = orderBy(trackedMovies, [(movie: IMovie) =>
      returnSortType(movie, sortConfig.selectedSortType)], [sortConfig.orderType ? 'asc' : 'desc'],
    );
    setTrackedMovies(sortedTrackedMovies);
    localforage.setItem('trackedMovies', sortedTrackedMovies);
  };

  return (
    <Overlay backdropPath={movie.backdrop_path}>
      <div>
        <AddMovie onClick={() => addMovie(movie)}>
          Add movie to your watchlist
        </AddMovie>
      </div>
    </Overlay>
  );
};

export default AddMovieToWatchList;
