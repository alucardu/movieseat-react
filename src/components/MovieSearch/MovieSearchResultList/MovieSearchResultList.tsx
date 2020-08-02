import React, { useState } from 'react';
import styled from 'styled-components';
import poster_not_found from '../../../assets/images/poster_not_found.svg';
import AddMovieToWatchList from './AddMovieToDashboard/AddMovieToDashboard';
import { orderBy } from 'lodash'

const ResultList = styled.ul`
  background: #3a3a3a;
  position: absolute;
  z-index: 1;
  list-style: none;
  top: 46px;
  width: 50%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  li {
    padding: 0 0px 0 8px;
    display: flex;
    align-items: center;
    position: relative;
    &:nth-child(even) {
      background: #444444;
    }
    &:hover {
      cursor: pointer;
      background: #0fcece;
    }
    p {
      width: calc(98% - 45px);
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span:nth-child(2) {
        font-size: 12px;
        color: #929292;
      }
    }
    img {
      margin-left: auto;
    }
  }
`

const NoResults = styled.li`
  height: 68px;
`
const PosterNotFound = styled.img`
  width: 45px;
  height: 68px;
`

const MovieSearchResultList = (props) => {

  const orderedList = orderBy(props.movieList, [movie => movie.release_date], ['desc']);
  const imagePath = 'https://image.tmdb.org/t/p/w45/'

  const ResultListItem = (props) => {
    const [isHover, setHover] = useState(false);
    return (
      <li 
        key={props.movie.id}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <p>
          <span>{props.movie.original_title}</span>
          <span>{props.movie.release_date}</span>
        </p>
        { props.movie.poster_path !== null 
          ? <img src={imagePath + props.movie.poster_path} alt={props.movie.original_title}/> 
          : <PosterNotFound src={poster_not_found} alt='No poster available' />
        }
        {isHover && <AddMovieToWatchList movieData={props.movie}/>}
      </li>
    )
  }

  return (
    <ResultList>
      { orderedList.length === 0 ? (<NoResults>No results were found...</NoResults>) : (null)}
      { orderedList.map(movie => {
        return (
          <ResultListItem key={movie.id} movie={movie} />
        )
      })}
    </ResultList>
  )
}

export default MovieSearchResultList