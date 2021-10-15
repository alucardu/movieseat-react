import React, {useState} from 'react';

import {IconButton} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {makeStyles} from '@mui/styles';
import {useMutation, useQuery} from '@apollo/client';
import resolvers from '../../resolvers';
import {currentUserVar, snackbarVar} from '../../cache';
import {EAction, IMovie} from '../../movieseat';

import {useCreateNotification} from '../../helpers/createNotification';

const useStyles = makeStyles({
  deleteButton: {
    'display': 'flex',
    'alignSelf': 'flex-end',
    'justifyContent': 'center',
    'width': '100%',
    'paddingBottom': '8px',
    '& svg': {
      cursor: 'pointer',
    },
  },
});

export const AddMovieFromSuggestions = ({movie}: {movie: IMovie}) => {
  const movieId = movie.tmdb_id ? movie.tmdb_id : movie.id;
  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=a8f7039633f2065942cd8a28d7cadad4&language=en-US';
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  fetch(baseUrl + movieId + apiKey)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });

  const {error, loading, data: {moviesFromUser: movies} = {}} =
    useQuery(resolvers.queries.ReturnMoviesFromUser, {
      variables: {userId: currentUserVar().id},
    });
  const createNotification = useCreateNotification();
  const [addUserToMovie] = useMutation(resolvers.mutations.AddUserToMovie);
  const classes = useStyles();


  if (loading) return (<div>loading</div>);
  if (error) return (<div>error</div>);

  const checkIsMovieDuplicate = (movies: IMovie[], movieDetails: IMovie) => {
    for (const item of movies) {
      if (item.tmdb_id === movieDetails.id) return true;
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
    <IconButton data-cy='btn_add_movie' className={classes.deleteButton} onClick={() => {
      addMovie(movie);
    }} >
      <AddBoxIcon sx={{color: 'white'}}/>
    </IconButton>
  );
};
