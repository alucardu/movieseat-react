import React, {useState, useEffect} from 'react';

import {useApolloClient, useMutation} from '@apollo/client';

import {AddMovieFromSearchOverlay, AddMovieFromSearchButton} from 'Src/styles';
import {useCreateNotification} from 'Helpers/createNotification';
import {IMovie, EAction} from 'Src/movieseat';
import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar} from 'Src/cache';

export const AddMovieToWatchList = ({movie}: {movie: IMovie}) => {
  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const movieId = movie.id;
  const apiKey = '?api_key=a8f7039633f2065942cd8a28d7cadad4&language=en-US';
  const [movieDetails, setMovieDetails] = useState<IMovie>();

  useEffect(() => {
    const controller = new AbortController();
    fetch(baseUrl + movieId + apiKey)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
        });
    return () => controller?.abort();
  }, []);

  const createNotification = useCreateNotification();
  const client = useApolloClient();
  const movies = client.readQuery({
    query: resolvers.queries.ReturnMoviesFromUser,
    variables: {userId: currentUserVar().id}});

  const [addUserToMovie] = useMutation(resolvers.mutations.AddUserToMovie);

  const checkIsMovieDuplicate = (movies: IMovie[], movieDetails: IMovie) => {
    for (const item of movies) {
      if (item.tmdb_id === movieDetails.id) return true;
    }
  };

  const addMovie = async (movie: IMovie) => {
    let message = 'is already added to your watchlist.';
    let severity = 'warning';
    if (!checkIsMovieDuplicate(movies.moviesFromUser, movie)) {
      await addUserToMovie({
        variables: {...movieDetails, tmdb_id: movieDetails?.id},
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
    snackbarVar({message: `${movie.original_title} ${message}`, severity: severity});
  };


  return (
    <AddMovieFromSearchOverlay movie={movie}>
      <AddMovieFromSearchButton onClick={() => addMovie(movie)}>
        Add movie to your watchlist
      </AddMovieFromSearchButton>
    </AddMovieFromSearchOverlay>
  );
};
