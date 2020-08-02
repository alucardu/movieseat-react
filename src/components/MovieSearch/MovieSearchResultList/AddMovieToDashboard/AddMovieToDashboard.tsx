import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import localforage from 'localforage';
import { MovieContext } from '../../../../context/MovieContext';
import { orderBy } from 'lodash';
import { useSnackbar } from 'notistack';

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
  background: ${movie => movie.backdrop_path ? `url(${backdropUrl + movie.backdrop_path} ) no-repeat center center` : null};
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

const AddMovieToWatchList = ({movie}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [trackedMovies, setTrackedMovies] = useState(['']);
  const [sortConfig, setSortConfig] = useState({selectedSortType: '', orderType: ''})
  const isMountedRef = useRef(true)
  
  useEffect( () => {
    localforage.getItem<sortConfig>('sortType').then((value) => {
      if (isMountedRef.current) {
        setSortConfig(value)
      }
    })
    localforage.getItem<string []>('trackedMovies').then((value) => {
      if (isMountedRef.current) {
        setTrackedMovies(value);
      }
    })
  }, [])
  
  const [movies, setMovies] = useContext(MovieContext)

  const addMovie = async (movie) => {
    if (!checkForDuplicate(trackedMovies, movie)) {
      AddMovieToLocalStorage(movie)

      setMovies(prevMovies => [...prevMovies, {
        original_title: movie.original_title, 
        poster_path: movie.poster_path, 
        id: movie.id
      }])

      enqueueSnackbar('Added ' + movie.original_title + ' to your watchlist.' , {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Movie ' + movie.original_title + ' is already on your watchlist.' , {
        variant: 'error',
      });
    }
  }

  const returnSortType = (movie, selectedSortType) => {
    switch (selectedSortType) {
      case 'release_date':
        return movie.release_date;      
      case 'title':
        return movie.title;
    }
  }

  const checkForDuplicate = (trackedMovies, movie) => {
    for (let item of trackedMovies) {
      if (item.id === movie.id) return true;
    }
  }

  const AddMovieToLocalStorage = async (movie) => {
    trackedMovies.push(movie);
    const sortedTrackedMovies = orderBy(trackedMovies, [movie => returnSortType(movie, sortConfig.selectedSortType)], [sortConfig.orderType ? 'asc' : 'desc'])
    setTrackedMovies(sortedTrackedMovies);
    localforage.setItem('trackedMovies', sortedTrackedMovies)
  }

  return (
      <Overlay backdrop_path={movie.backdrop_path}>
        <div>
          <AddMovie onClick={() => addMovie(movie)}>Add movie to your watchlist</AddMovie>
        </div>
      </Overlay>
  )
}

export default AddMovieToWatchList