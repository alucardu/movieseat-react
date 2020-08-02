import React from 'react'
import localforage from 'localforage'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';

const DeleteButton = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;  
  width: 100%;
  padding-bottom: 8px;
  svg {
    cursor: pointer;
  }
`

const removeMovieFromDashboard = ({movie}) => {
  const removeMovieFromList = async (movie) => {
    const value = await localforage.getItem<any []>('trackedMovies');
    value.forEach((item, index) => {
      if (item.id === movie.id) {
        value.splice(index, 1);
        localforage.setItem('trackedMovies', value)
      }
    })
  }

  return (
    <DeleteButton onClick={() => removeMovieFromList(movie)}>
      <DeleteForeverIcon/>
    </DeleteButton>
  )
}

export default removeMovieFromDashboard