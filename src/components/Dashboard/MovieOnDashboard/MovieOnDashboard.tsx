import React, {useState} from 'react';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard';
import {IMovie} from '../../../movieseat';
import {makeStyles} from '@material-ui/styles';

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

const OverlayEl = ({movie}: { movie: IMovie}) => {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      <RemoveMovieFromDashboard movie={movie}/>
    </div>
  );
};

const MovieOnDashboard = ({movie}: {movie: IMovie}) => {
  const classes = useStyles();
  const imagePath = 'https://image.tmdb.org/t/p/w185/';
  const [isHover, setHover] = useState(false);

  return (
    <li className={classes.movieContainer}
      key={movie.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img src={imagePath + movie.poster_path} alt='poster' />
      { isHover && <OverlayEl movie={movie} />}
    </li>
  );
};

export default MovieOnDashboard;
