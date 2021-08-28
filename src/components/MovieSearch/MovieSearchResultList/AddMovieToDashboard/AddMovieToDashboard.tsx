import React, {useEffect, useState, useRef, useContext} from 'react';
import styled from 'styled-components';
import localforage from 'localforage';
import {orderBy} from 'lodash';
import {useSnackbar} from 'notistack';
import {IMovie, ISortConfig} from '../../../../movieseat';
import {MovieContext} from '../../../../context/MovieContext';
import {useMutation} from '@apollo/client';
import resolvers from '../../../../../src/resolvers';

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
  const [addMovieRes, {data}] = useMutation(resolvers.mutations.AddMovie);

  const {enqueueSnackbar} = useSnackbar();
  const [movies, setMovies] = useContext(MovieContext);
  const [sortConfig, setSortConfig] = useState({selectedSortType: '', orderType: ''});
  const isMountedRef = useRef(true);

  useEffect( () => {
    localforage.getItem<ISortConfig>('sortType').then((value) => {
      if (isMountedRef.current && value) {
        setSortConfig(value);
        addMovieToLocalStorage(movies);
      }
    });
  }, [movies]);

  const addMovie = (movie: IMovie) => {
    console.log(movie);
    addMovieRes({variables: {
      original_title: movie.original_title,
      tmdb_id: movie.id,
      poster_path: movie.poster_path,
    }});
    console.log(data);
    let message = 'is already added to your watchlist.';
    let variant = 'warning';
    if (!checkIsMovieDuplicate(movies, movie)) {
      setMovies((movies) => sortMovieList([...movies, movie]));
      message = 'has been added to your watchlist.';
      variant = 'success';
    }
    displaySnackbar(`${movie.original_title} ${message}`, {variant});
  };

  const displaySnackbar = (message: string, variant: any) => {
    enqueueSnackbar(message, variant);
  };

  const returnSortType = (movie: IMovie, selectedSortType: string) => {
    switch (selectedSortType) {
      case 'release_date':
        return movie.release_date;
      case 'title':
        return movie.original_title;
    }
  };

  const checkIsMovieDuplicate = (movies: IMovie[], movie: IMovie) => {
    for (const item of movies) {
      if (item.id === movie.id) return true;
    }
  };

  const addMovieToLocalStorage = async (movies: IMovie[]) => {
    localforage.setItem('trackedMovies', movies);
  };

  const sortMovieList = (movies: IMovie[]) => {
    return orderBy(movies, [(movie: IMovie) =>
      returnSortType(movie, sortConfig.selectedSortType)], [sortConfig.orderType ? 'asc' : 'desc'],
    );
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
