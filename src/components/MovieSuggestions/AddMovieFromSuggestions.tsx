import React, {useState, useEffect} from 'react';

import {useMutation, useQuery} from '@apollo/client';

import {IconButton} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar} from 'Src/cache';
import {EAction, IMovie} from 'Src/movieseat';

import {useCreateNotification} from 'Helpers/createNotification';
import RemoveMovieFromDashboard from 'Components/Dashboard/MovieOnDashboard/RemoveMovieFromDashboard/RemoveMovieFromDashboard';

export const AddMovieFromSuggestions = ({movie}: {movie: IMovie}) => {
  const movieId = movie.tmdb_id ? movie.tmdb_id : movie.id;
  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=a8f7039633f2065942cd8a28d7cadad4&language=en-US';
  const [movieDetails, setMovieDetails] = useState<IMovie>();

  useEffect(() => {
    fetch(baseUrl + movieId + apiKey)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
        });
  }, []);

  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      variables: {userId: currentUserVar().id},
    });
  const createNotification = useCreateNotification();
  const [addUserToMovie] = useMutation(resolvers.mutations.AddUserToMovie);

  if (loading) return (<div>loading</div>);
  if (error) return (<div>error</div>);

  const checkIsMovieDuplicate = (movies: IMovie[], movieDetails: IMovie) => {
    for (const item of movies) {
      if (item.tmdb_id === movieDetails.id || item.id === movieDetails.id) return true;
    }
  };

  const addMovie = async (movie) => {
    let message = 'is already added to your watchlist.';
    let severity = 'warning';
    if (!checkIsMovieDuplicate(movies, movie)) {
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
    <>
      { checkIsMovieDuplicate(movies, movie) ?
        <RemoveMovieFromDashboard movie={movie} /> :
        <IconButton data-cy='btn_add_movie' onClick={() => {
          addMovie(movie);
        }} >
          <AddBoxIcon/>
        </IconButton>
      }
    </>
  );
};
