import React, {useState} from 'react';
import posterNotFound from '../../../assets/images/poster_not_found.svg';
import {AddMovieToWatchList} from './AddMovieToDashboard/AddMovieToDashboard';
import {orderBy} from 'lodash';
import {IMovie, IMovieList} from '../../../movieseat';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  resultList: {
    'background': '#3a3a3a',
    'position': 'absolute',
    'zIndex': 1,
    'listStyle': 'none',
    'top': '46px',
    'width': '50%',
    'boxSizing': 'border-box',
    'margin': '0',
    'padding': '0',
    '& li': {
      'padding': '0 0px 0 8px',
      'display': 'flex',
      'alignItems': 'center',
      'position': 'relative',
      '> & :hover': {
        cursor: 'pointer',
        background: '#0fcece',
      },
      '& p': {
        'width': 'calc(98% - 45px)',
        'display': 'flex',
        'flexDirection': 'column',
        'span:nth-child(1)': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        '& span:nth-child(2)': {
          fontSize: '12px',
          color: '#929292',
        },
      },
      '& img': {
        marginLeft: 'auto',
      },
    },
  },
  noResults: {
    height: '68px',
  },
  posterNotFound: {
    width: '45px',
    height: '68px',
  },
});

const MovieSearchResultList = ({movieList}: {movieList: IMovieList}) => {
  const classes = useStyles();
  const orderedList = orderBy<IMovieList>(
      movieList, [(movie: IMovie) => movie.release_date], ['desc']);
  const imagePath = 'https://image.tmdb.org/t/p/w45/';

  const ResultListItem = (movie: any) => {
    const [isHover, setHover] = useState(false);

    const handleHover = (value) => {
      setHover(value);
    };

    return (
      <li
        key={movie.movie.id}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}>
        <p>
          <span>{movie.movie.original_title}</span>
          <span>{movie.movie.release_date}</span>
        </p>
        { movie.movie.poster_path !== null ?
          <img
            src={imagePath + movie.movie.poster_path}
            alt={movie.original_title}/>:
          <img className={classes.posterNotFound} src={posterNotFound} alt='No poster available' />
        }
        {isHover && <AddMovieToWatchList movie={movie.movie}/>}
      </li>
    );
  };

  return (
    <ul data-cy='list_movie_search_results' className={classes.resultList}>
      { orderedList.length === 0 ? (
        <li className={classes.noResults}>No results were found...</li>) : (null)
      }
      { orderedList.map((movie: IMovie) => {
        return (
          <ResultListItem key={movie.id} movie={movie} />
        );
      })}
    </ul>
  );
};

export default MovieSearchResultList;
