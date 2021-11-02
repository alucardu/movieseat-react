import React, {useState, forwardRef} from 'react';

import {useReactiveVar} from '@apollo/client';

import {orderBy} from 'lodash';

import {ResultList} from 'Src/styles';
import {IMovie} from 'Src/movieseat';
import posterNotFound from 'Assets/images/poster_not_found.svg';

import {movieSearchResultsVar, movieSearchActiveVar} from 'Src/cache';
import {AddMovieToWatchList} from 'Components/MovieSearch/MovieSearchResultList/AddMovieToDashboard/AddMovieToDashboard';

const MovieSearchResultList = (props, ref) => {
  const searching = useReactiveVar(movieSearchActiveVar);
  const movieList = useReactiveVar(movieSearchResultsVar);
  const orderedList = orderBy(
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
          <img className={'posterNotFound'} src={posterNotFound} alt='No poster available' />
        }
        {isHover && <AddMovieToWatchList movie={movie.movie}/>}
      </li>
    );
  };

  return (
    <ResultList searchEl={ref.current}
      data-cy='list_movie_search_results'>
      { orderedList.length === 0 && searching ? (
        <li className={'noResults'}>No results were found...</li>) : (null)
      }
      { orderedList.map((movie: IMovie) => {
        return (
          <ResultListItem key={movie.id} movie={movie} />
        );
      })}
    </ResultList>
  );
};

export default forwardRef(MovieSearchResultList);
