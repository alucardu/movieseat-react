import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CardMedia} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {MovieContainer, MovieContainerOverlay} from 'Src/styles';
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

const MovieOnDashboard = ({toggle, isActive, id, type, movie}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.down('md'));
  const [listItemSize, setListItemSize] = useState([0, 0]);
  const [size, setSize] = useState(0);
  const listRef = useRef<any>(null);
  const imagePath = 'https://image.tmdb.org/t/p/w780/';

  const MovieOnDashboardClasses = classNames({
    ['hover']: movie.original_title.length > 0 && isActive,
    ['filler']: movie.original_title.length === 0,
  });

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

    >
      {movie.original_title}
      {movie.original_title.length > 0 ?
        <>
          <CardMedia
            onClick={!isMdUp ? () => (false) : () => toggle(id)}
            onMouseEnter={isMdUp && movie.original_title.length > 0 ? () => (false) : () => toggle(id)}
            onMouseLeave={isMdUp && movie.original_title.length > 0 ? () => (false) : () => toggle(id)}
            component="img"
            sx={{height: listItemSize[0], maxWidth: listItemSize[1], zIndex: 2}}
            image={imagePath + movie.poster_path}
          />
          <OverlayEl type={type} movie={movie} />
        </> :
        null}
    </MovieContainer>
  );
};

export default MovieOnDashboard;

MovieOnDashboard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
  }),
  toggle: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
};
