import React from 'react';

import {useMutation} from '@apollo/client';

import {IMovie} from 'Src/movieseat';
import resolvers from 'Src/resolvers';
import {snackbarVar} from 'Src/cache';

import {makeStyles} from '@mui/styles';
import {Box, IconButton} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    removeMovieRes({
      variables: {id: parseInt(movie.id)},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            moviesFromUser: () => {
              return [...data.removeMovie];
            },
          },
        });
      },
    }).then(() => {
      snackbarVar({message: 'Removed ' + movie.original_title + ' from your watchlist', severity: 'success'});
    });
  };

  return (
    <Box>
      <IconButton
        data-cy='btn_remove_movie_from_dashboard'
        className={classes.deleteButton}
        onClick={() => removeMovieFromList(movie)}
      >
        <DeleteForeverIcon/>
      </IconButton>
    </Box>
  );
};

export default RemoveMovieFromDashboard;
