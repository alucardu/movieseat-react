import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';
import {IMovie} from '../../../../movieseat';
import {useMutation} from '@apollo/client';
import resolvers from '../../../..//resolvers';
import {moviesVar} from '../../../../cache';

const DeleteButton = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;  
  width: 100%;
  padding-bottom: 8px;
  svg {
    cursor: pointer;
  }
`;
const RemoveMovieFromDashboard = ({movie}: {movie: IMovie}) => {
  const [removeMovieRes] = useMutation(resolvers.mutations.RemoveMovie);
  const {enqueueSnackbar} = useSnackbar();

  const removeMovieFromList = async (movie) => {
    const movies = await removeMovieRes({variables: {id: parseInt(movie.id)}});
    moviesVar(movies.data.removeMovie);

    enqueueSnackbar(
        'Removed ' + movie.original_title + ' from your watchlist.',
        {variant: 'success'},
    );
  };

  return (
    <DeleteButton onClick={() => removeMovieFromList(movie)}>
      <DeleteForeverIcon/>
    </DeleteButton>
  );
};

export default RemoveMovieFromDashboard;
