import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CardMedia, IconButton} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

import {MovieContainer, MovieContainerOverlay} from 'Src/styles';
import RemoveMovieFromDashboard from 'Components/Dashboard/MovieOnDashboard/RemoveMovieFromDashboard/RemoveMovieFromDashboard';
import {AddMovieFromSuggestions} from 'Components/MovieSuggestions/AddMovieFromSuggestions';

const OverlayEl = (props) => {
  const type = {...props}.type;
  const movie = {...props}.movie;
  return (
    <MovieContainerOverlay>
      {type === 'suggestion' ?
        <AddMovieFromSuggestions movie={movie} /> :
        <>
          <IconButton>
            <Link to={`/movie/${movie.id}`}><LocalMoviesIcon /></Link>
          </IconButton>
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
      onClick={!isMdUp ? () => (false) : () => toggle(id)}
      onMouseEnter={isMdUp && movie.original_title.length > 0 ? () => (false) : () => toggle(id)}
      onMouseLeave={isMdUp && movie.original_title.length > 0 ? () => (false) : () => toggle(id)}
    >
      {movie.original_title.length > 0 ?
        <>
          <CardMedia
            component="img"
            sx={{height: listItemSize[0], maxWidth: listItemSize[1], zIndex: 2}}
            image={movie.poster_path ? imagePath + movie.poster_path : imagePath + movie.backdrop_path}
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
    backdrop_path: PropTypes.string,
  }),
  toggle: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
};
