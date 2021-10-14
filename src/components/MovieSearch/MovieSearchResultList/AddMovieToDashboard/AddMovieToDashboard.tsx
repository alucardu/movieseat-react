import React, {useState} from 'react';
import {IMovie} from '../../../../movieseat';
import {useApolloClient, useMutation} from '@apollo/client';
import resolvers from '../../../../../src/resolvers';
import {currentUserVar, snackbarVar} from '../../../../cache';
import {makeStyles} from '@mui/styles';
import {useCreateNotification} from '../../../../helpers/createNotification';
import {EAction} from '../../../../movieseat';

const backdropUrl = 'https://image.tmdb.org/t/p/w780/';
interface OverlayData {
  readonly backdropPath: string;
}

const useStyles = makeStyles({
  overlay: (props: OverlayData) => ({
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
    'left': 0,
    'background': props.backdropPath ? `url(${backdropUrl + props.backdropPath}) no-repeat center center` : '#4d4d4d',
    'backgroundSize': 'cover',
    '& div': {
      background: '#00000073',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  addMovie: {
    padding: '8px',
    background: '#0fcece',
    borderRadius: '12px',
  },
});

const AddMovieToWatchList = ({movie}: {movie: IMovie}) => {
  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const movieId = movie.id;
  const apiKey = '?api_key=a8f7039633f2065942cd8a28d7cadad4&language=en-US';
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  fetch(baseUrl + movieId + apiKey)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });

  const createNotification = useCreateNotification();
  const client = useApolloClient();
  const movies = client.readQuery({
    query: resolvers.queries.ReturnMoviesFromUser,
    variables: {userId: currentUserVar().id}});
  const props = {backdropPath: movie.backdrop_path};
  const classes = useStyles(props);

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
    <div className={classes.overlay}>
      <div>
        <a className={classes.addMovie} onClick={() => addMovie(movie)}>
        Add movie to your watchlist
        </a>
      </div>
    </div>
  );
};

export default AddMovieToWatchList;
