import React, {useState, forwardRef, useEffect} from 'react';

import {useReactiveVar} from '@apollo/client';

import orderBy from 'lodash/orderBy';

import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {ResultListBackground, ResultList} from 'Src/styles';
import {IMovie} from 'Src/movieseat';
import {ResultListItem} from 'Components/MovieSearch/MovieSearchResultList/MovieSearchResultListItem';

import {movieSearchResultsVar, movieSearchActiveVar} from 'Src/cache';
import {ListItem, Typography} from '@mui/material';

// eslint-disable-next-line react/prop-types
const MovieSearchResultList = ({width}, ref) => {
  const movieAdded = useReactiveVar(movieSearchActiveVar);
  const [activeId, setActiveId] = useState(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.down('md'));
  const searching = useReactiveVar(movieSearchActiveVar);
  const movieList = useReactiveVar(movieSearchResultsVar);
  const orderedList = orderBy(
      movieList, [(movie: IMovie) => movie.release_date], ['desc']);

  const handleClick = (id) => {
    id === activeId ? setActiveId(null) : setActiveId(id);
  };

  const disableBodyScroll = (value) => {
    value ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
  };

  useEffect(() => {
    movieAdded ? null : handleClick(null);
  }, [movieAdded]);

  useEffect(() => {
    disableBodyScroll(searching);
  }, [searching]);


  return (
    <ResultListBackground
      onClick={isMdUp ? () => (false) : () => movieSearchActiveVar(false)}
      className={searching ? 'searchActive' : ''}
    >
      {searching ?
        <ResultList
          searchel={ref.current}
          data-cy='list_movie_search_results'
          sx={{width: width}}
        >
          { orderedList.length === 0 && searching ? (
            <ListItem className={'noResults'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Typography sx={{color: 'white'}} variant='body1'>
                No results were found...</Typography>
            </ListItem>) : (null)
          }
          { orderedList.map((movie: IMovie, i) => {
            return (
              <ResultListItem
                key={movie.id}
                movie={movie}
                toggle={handleClick}
                isActive={i === activeId}
                id={i}
              />
            );
          })}
        </ResultList> : null}
    </ResultListBackground>
  );
};

export default forwardRef(MovieSearchResultList);
