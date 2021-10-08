import React, {useState} from 'react';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard';
import {makeStyles} from '@mui/styles';
import {AddMovieFromSuggestions} from '../..//MovieSuggestions/AddMovieFromSuggestions';

const useStyles = makeStyles({
  overlay: {
    position: 'absolute',
    background: '#000000b5',
    top: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
  },

  movieContainer: {
    'maxHeight': '300px',
    'maxWidth': '185px',
    'position': 'relative',
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
});

const OverlayEl = (movie) => {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      {movie.movie.type === 'suggestion' ?
        <AddMovieFromSuggestions movie={movie.movie.movie} /> :
        <RemoveMovieFromDashboard movie={movie.movie.movie}/>}

    </div>
  );
};

const MovieOnDashboard = (movie) => {
  const classes = useStyles();
  const imagePath = 'https://image.tmdb.org/t/p/w185/';
  const [isHover, setHover] = useState(false);

  return (
    <li className={classes.movieContainer}
      key={movie.movie.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img src={imagePath + movie.movie.poster_path} alt='poster' />
      { isHover && <OverlayEl movie={movie} />}
    </li>
  );
};

export default MovieOnDashboard;
