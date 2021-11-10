import React, {useState, useEffect, useRef} from 'react';

import {Box, Divider} from '@mui/material';

import {ResultListItemStyle} from 'Src/styles';
import {IMovie} from 'Src/movieseat';
import {AddMovieToWatchList} from 'Components/MovieSearch/MovieSearchResultList/AddMovieToDashboard/AddMovieToDashboard';

// eslint-disable-next-line react/prop-types
export const ResultListItem = ({movie, toggle, isActive, id}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [listHeight, setListHeight] = useState(0);
  const imagePath = 'https://image.tmdb.org/t/p/w45/';

  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=a8f7039633f2065942cd8a28d7cadad4&language=en-US';
  const [movieDetails, setMovieDetails] = useState<IMovie>(movie);

  const handleClick = (e, id) => {
    e.stopPropagation();
    toggle(id);
  };

  useEffect(() => {
    if (isActive) {
      const controller = new AbortController();
      fetch(baseUrl + movie.id + apiKey)
          .then((response) => response.json())
          .then((data) => {
            setMovieDetails(data);
            if (ref.current) {
              let listHeight = 0;
              const childElements: HTMLCollection = ref.current.children;
              for (const childElement of childElements) {
                listHeight += childElement.clientHeight;
              }
              setListHeight(listHeight + 28);
            }
          });
      return () => controller?.abort();
    }
  }, [isActive]);

  return (
    <ResultListItemStyle
      ref={ref}
      movie={movie}
      height={listHeight}
      className={isActive ? 'hover' : ''}
      key={movie.id}
      onClick={(e) => handleClick(e, id)}
    >
      <Box>
        <h1>{movie.original_title}</h1>
        <h2>{movie.release_date}</h2>
        <img
          src={imagePath + movie.poster_path}
          alt={movie.original_title}
        />
      </Box>
      {(isActive && movieDetails) ?
        <Box>
          {movieDetails?.runtime > 0 && <p>Runtime: {movieDetails?.runtime}</p>}
          {movieDetails?.budget > 0 && <p>Budget: {movieDetails?.budget}</p>}
          {movieDetails?.vote_average > 0 && <p>Rating: {movieDetails?.vote_average}</p>}
          {movieDetails?.overview &&
            <>
              <Divider sx={{borderColor: '#ffffff85'}} />
              <p>{movieDetails?.overview}</p>
            </>
          }
        </Box> : null
      }
      {isActive && <AddMovieToWatchList movie={movieDetails}/>}
    </ResultListItemStyle>
  );
};
