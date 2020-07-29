import React from 'react';
import styled from 'styled-components';
import poster_not_found from '../../../assets/images/poster_not_found.svg';

const ResultList = styled.ul`
  background: #3a3a3a;
  position: absolute;
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

const MovieResultList = (props) => {

  const imagePath = 'https://image.tmdb.org/t/p/w45/'

  return (
    <ResultList>
      { props.movieList.length === 0 ? (<NoResults>No results were found...</NoResults>) : (null)}
      { props.movieList.map(movie => {
        return (
          <li key={movie.id}>
            <p>
              <span>{movie.original_title}</span>
              <span>{movie.release_date}</span>
            </p>
            { movie.poster_path !== null 
              ? <img src={imagePath + movie.poster_path} alt={movie.original_title}/> 
              : <PosterNotFound src={poster_not_found} alt='No poster available' />
            }
          </li>
        )
      })}
    </ResultList>
  )
}

export default MovieResultList