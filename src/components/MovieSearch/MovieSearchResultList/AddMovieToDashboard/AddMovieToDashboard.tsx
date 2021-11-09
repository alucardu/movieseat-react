import React from 'react';

import {useApolloClient, useMutation} from '@apollo/client';

import {AddMovieFromSearchButton} from 'Src/styles';
import {useCreateNotification} from 'Helpers/createNotification';
import {IMovie, EAction} from 'Src/movieseat';
import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar, movieSearchActiveVar} from 'Src/cache';

export const AddMovieToWatchList = ({movie}: {movie: IMovie}) => {
  const createNotification = useCreateNotification();
  const client = useApolloClient();
  const movies = client.readQuery({
    query: resolvers.queries.ReturnMoviesFromUser,
    variables: {userId: currentUserVar().id}});

  const [addUserToMovie] = useMutation(resolvers.mutations.AddUserToMovie);

  const checkIsMovieDuplicate = (movies: IMovie[], movie: IMovie) => {
    for (const item of movies) {
      if (item.tmdb_id === movie.id) return true;
    }
  };

  const addMovie = async (movie: IMovie) => {
    let message = 'is already added to your watchlist.';
    let severity = 'warning';
    if (!checkIsMovieDuplicate(movies.moviesFromUser, movie)) {
      await addUserToMovie({
        variables: {...movie, tmdb_id: movie?.id},
        update: (cache, {data}) => {
          cache.modify({
            fields: {
              moviesFromUser: () => {
                return [...data.addUserToMovie.addUserToMovie];
              },
            },
          });
        },
      }).then( async (res) => {
        createNotification.createNotification({
          movie: res.data.addUserToMovie.addedMovie,
          user: currentUserVar(),
          action: EAction.Added_Movie,
        });
        message = 'has been added to your watchlist.';
        severity = 'success';
      });
    }
    movieSearchActiveVar(false);
    snackbarVar({message: `${movie.original_title} ${message}`, severity: severity});
  };


  return (
    <AddMovieFromSearchButton onClick={() => addMovie(movie)}>
      Add movie to your watchlist
    </AddMovieFromSearchButton>
  );
};
