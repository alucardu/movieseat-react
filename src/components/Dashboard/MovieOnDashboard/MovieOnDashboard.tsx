import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

import classNames from 'classnames';

import {CardMedia} from '@mui/material';

import {MovieContainer, MovieContainerOverlay} from 'Src/styles';
import {IMovie} from 'Src/movieseat';
import RemoveMovieFromDashboard from 'Components/Dashboard/MovieOnDashboard/RemoveMovieFromDashboard/RemoveMovieFromDashboard';
import {AddMovieFromSuggestions} from 'Components/MovieSuggestions/AddMovieFromSuggestions';
import {RateMovie} from 'Components/RateMovie/RateMovie';
import {MovieModal} from 'Components/MovieModal/MovieModal';

const OverlayEl = (props) => {
  const type = {...props}.type;
  const movie = {...props}.movie;
  return (
    <MovieContainerOverlay>
      {type === 'suggestion' ?
        <AddMovieFromSuggestions movie={movie} /> :
        <>
          <MovieModal movie={movie} />
          <RateMovie movie={movie} />
          <RemoveMovieFromDashboard movie={movie}/>
        </>
      }
    </MovieContainerOverlay>
  );
};

const MovieOnDashboard = (props) => {
  const movie: IMovie = {...props}.movie;
  const [listItemSize, setListItemSize] = useState([0, 0]);
  const [size, setSize] = useState(0);
  const listRef = useRef<any>(null);
  const imagePath = 'https://image.tmdb.org/t/p/w780/';
  const [isHover, setHover] = useState(false);
  const MovieOnDashboardClasses = classNames({
    ['hover']: isHover,
    ['filler']: movie.original_title.length === 0,
  });

  const handleHover = (value, event, movie) => {
    if (event.target.parentElement.parentElement.nodeName =='UL') {
      const listElements = event.target.parentElement.parentElement.children;
      for (const item of listElements) {
        const classes = item.classList;
        for (const className of classes ) {
          if (className.includes('hover')) {
            if (item !== event.target.parentElement) {
              item.classList.remove(className);
              setHover(true);
            }
          }
        }
      }
    }
    if (movie.original_title.length == 0) return;
    setHover(value);
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (listRef.current) {
        setListItemSize([listRef.current.offsetWidth * 1.5, listRef.current.offsetWidth]);
      }
    }, 75);
  }, [size]);

  return (
    <MovieContainer
      ref={listRef}
      disablePadding={true}
      className={MovieOnDashboardClasses}
      title={movie.original_title}
      key={movie.id}
      onMouseEnter={(event) => handleHover(true, event, movie)}
      onMouseLeave={(event) => handleHover(false, event, movie)}>
      {movie.original_title.length > 0 ?
        <CardMedia
          component="img"
          sx={{height: listItemSize[0], maxWidth: listItemSize[1]}}
          image={imagePath + movie.poster_path}
        /> :
        null}
      { isHover ? <OverlayEl type={{...props}.type} movie={movie} /> : null}
    </MovieContainer>
  );
};

export default MovieOnDashboard;
