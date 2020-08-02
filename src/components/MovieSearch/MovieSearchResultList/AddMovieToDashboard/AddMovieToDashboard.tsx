import React, { useContext } from 'react';
import styled from 'styled-components';
import localforage from 'localforage';
import { MovieContext } from '../../../../context/MovieContext';
import { orderBy } from 'lodash';

const backdropUrl = 'https://image.tmdb.org/t/p/w780'

interface OverlayData {
  readonly backdrop_path: string;
}

type sortConfig = {
  selectedSortType: string,
  orderType: string
}

const Overlay = styled.div<OverlayData>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background: ${props => `url(${backdropUrl + props.backdrop_path}) no-repeat center center`};
  background-size: cover;
  div {
    background: #00000073;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const AddMovie = styled.a`
  padding: 8px;
  background: #0fcece;
  border-radius: 12px;
`

const AddMovieToWatchList = (movie) => {

  const [movies, setMovies] = useContext(MovieContext)

  const addMovie = (movie) => {
    AddMovieToLocalStorage(movie)

    setMovies(prevMovies => [...prevMovies, {
      original_title: movie.movieData.original_title, 
      poster_path: movie.movieData.poster_path, 
      id: movie.movieData.id
    }])
  }

  const returnSortType = (movie, selectedSortType) => {
    switch (selectedSortType) {
      case 'release_date':
        return movie.release_date;      
      case 'title':
        return movie.title;
    }
  }

  const AddMovieToLocalStorage = async (movie) => {
    const sortConfig = await localforage.getItem<sortConfig>('sortType')
    let trackedMovies = await localforage.getItem<string []>('trackedMovies');
    trackedMovies.push(movie.movieData);
    trackedMovies = orderBy(trackedMovies, [movie => returnSortType(movie, sortConfig.selectedSortType)], [sortConfig.orderType ? 'asc' : 'desc']);
    localforage.setItem('trackedMovies', trackedMovies)
  }

  return (
    <Overlay backdrop_path={movie.movieData.backdrop_path}>
      <div>
        <AddMovie onClick={() => addMovie(movie)}>Add movie to your watchlist</AddMovie>
      </div>
    </Overlay>
  )
}

export default AddMovieToWatchList