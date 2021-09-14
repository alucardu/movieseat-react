import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {IMovie} from '../../../../movieseat';
import {useMutation} from '@apollo/client';
import resolvers from '../../../..//resolvers';
import {moviesVar, snackbarVar} from '../../../../cache';
import {makeStyles} from '@material-ui/styles';
import sortMovies from '../../../../helpers/sortMovies';

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

const RemoveMovieFromDashboard = ({movie}: {movie: IMovie}) => {
  const classes = useStyles();
  const [removeMovieRes] = useMutation(resolvers.mutations.RemoveMovie);

  const removeMovieFromList = async (movie) => {
    removeMovieRes({variables: {id: parseInt(movie.id)}}).then(async (movies) => {
      moviesVar(await sortMovies(movies.data.removeMovie));
      snackbarVar({message: 'Removed ' + movie.original_title + ' from your watchlist', severity: 'success'});
    });
  };

  return (
    <div className={classes.deleteButton} onClick={() => removeMovieFromList(movie)}>
      <DeleteForeverIcon/>
    </div>
  );
};

export default RemoveMovieFromDashboard;
