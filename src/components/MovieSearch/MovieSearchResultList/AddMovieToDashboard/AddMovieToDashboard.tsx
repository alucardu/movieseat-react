import React from 'react';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';
import {IMovie} from '../../../../movieseat';
import {useMutation} from '@apollo/client';
import resolvers from '../../../../../src/resolvers';
import {movieVar, moviesVar, currentUserVar} from '../../../../cache';

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
  const [addMovieRes] = useMutation(resolvers.mutations.AddMovie);
  const {enqueueSnackbar} = useSnackbar();

  const addMovie = (movie: IMovie) => {
    let message = 'is already added to your watchlist.';
    let variant = 'warning';
    if (!checkIsMovieDuplicate(moviesVar(), movie)) {
      addMovieRes({variables: {
        original_title: movie.original_title,
        tmdb_id: movie.id,
        poster_path: movie.poster_path,
        userId: currentUserVar().id,
      }});
      movieVar(movie);

      message = 'has been added to your watchlist.';
      variant = 'success';
    }
    displaySnackbar(`${movie.original_title} ${message}`, {variant});
  };

  const displaySnackbar = (message: string, variant: any) => {
    enqueueSnackbar(message, variant);
  };

  const checkIsMovieDuplicate = (movies: IMovie[], movie: IMovie) => {
    for (const item of movies) {
      if (item.tmdb_id === movie.id) return true;
    }
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
