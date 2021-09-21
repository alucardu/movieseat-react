import React from 'react';
import {IMovie} from '../../../../movieseat';
import {useApolloClient, useMutation} from '@apollo/client';
import resolvers from '../../../../../src/resolvers';
import {currentUserVar, snackbarVar} from '../../../../cache';
import {makeStyles} from '@material-ui/styles';

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
  const client = useApolloClient();
  const movies = client.readQuery({
    query: resolvers.queries.ReturnMoviesFromUser,
    variables: {userId: currentUserVar().id}});
  const props = {backdropPath: movie.backdrop_path};
  const classes = useStyles(props);

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
        variables: {...movie, tmdb_id: movie.id},
        update: (cache, {data}) => {
          console.log(cache);
          cache.modify({
            fields: {
              moviesFromUser: () => {
                return [...data.addUserToMovie];
              },
            },
          });
        },
      }).then(() => {
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
