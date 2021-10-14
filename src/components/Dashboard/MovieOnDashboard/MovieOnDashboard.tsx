import React, {useState, useRef, useEffect, useLayoutEffect, forwardRef} from 'react';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard';
import {makeStyles} from '@mui/styles';
import {AddMovieFromSuggestions} from '../..//MovieSuggestions/AddMovieFromSuggestions';
import {CardMedia, ListItem} from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {IMovie} from '../../../movieseat';
import {RateMovie} from '../../RateMovie/RateMovie';

const useStyles = makeStyles({
  overlay: {
    position: 'absolute',
    right: 0,
    top: '0',
    height: '100%',
    display: 'flex',
    width: '115px',
  },

  movieContainer: {
    'borderRadius': '8px',
    'width': 'auto',
    'transition': 'all 0.3s ease',
    'flexGrow': 1,
    'flexBasis': 0,
    'position': 'relative',
    'padding': 0,
    'margin': '0 8px 8px 0',
    '& img': {
      borderRadius: '8px',
    },
  },

  hover: {
    'flexGrow': 2.5,
    'backgroundColor': '#414141',
  },

  filler: {
    background: 'transparent',
  },
});

const OverlayEl = (props) => {
  const type = {...props}.type;
  const movie = {...props}.movie;
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      {type === 'suggestion' ?
        <AddMovieFromSuggestions movie={movie} /> :
        <>
          <RateMovie movie={movie} />
          <RemoveMovieFromDashboard movie={movie}/>
        </>
      }
    </div>
  );
};

const MovieOnDashboard = (props) => {
  const movie: IMovie = {...props}.movie;
  const [listItemSize, setListItemSize] = useState([0, 0]);
  const [size, setSize] = useState(0);
  const listRef = useRef<any>(null);
  const imagePath = 'https://image.tmdb.org/t/p/w185/';
  const [isHover, setHover] = useState(false);
  const classes = useStyles();
  const MovieOnDashboardClasses = classNames({
    [`${classes.hover}`]: isHover,
    [`${classes.movieContainer}`]: true,
    [`${classes.filler}`]: movie.original_title.length === 0,
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
    if (listRef.current) {
      setListItemSize([listRef.current.offsetWidth * 1.5, listRef.current.offsetWidth]);
    }
  }, [size]);

  return (
    <ListItem
      ref={listRef}
      className={MovieOnDashboardClasses}
      title={movie.original_title}
      key={movie.id}
      onMouseOver={(event) => handleHover(true, event, movie)}
      onMouseLeave={(event) => handleHover(false, event, movie)}>
      {movie.original_title.length > 0 ?
        <CardMedia
          component="img"
          sx={{height: listItemSize[0], maxWidth: listItemSize[1]}}
          image={imagePath + movie.poster_path}
        /> :
        null}
      { isHover ? <OverlayEl type={{...props}.type} movie={movie} /> : null}
    </ListItem>
  );
};

export default forwardRef(MovieOnDashboard);

MovieOnDashboard.PropTypes = {
  props: PropTypes.object,
  type: PropTypes.string,
};
