import React, { useState } from 'react';
import styled from 'styled-components';

import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard';

const Overlay = styled.div`
  position: absolute;
  background: #000000b5;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
`

const MovieContainer = styled.li`
  position: relative;
  img {
    height: 100%;
    width: 100%;
  }
`

const OverlayEl = ({movie}) => {
  return (
    <Overlay>
      <RemoveMovieFromDashboard movie={movie}/>
    </Overlay>
  )
}

const MovieOnDashboard = ({movie}) => {
  const imagePath = 'https://image.tmdb.org/t/p/w185/'
  const [isHover, setHover] = useState(false);

  return (
    <MovieContainer 
      key={movie.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
        <img src={imagePath + movie.poster_path} alt='poster' />
      { isHover && <OverlayEl movie={movie} />}      
    </MovieContainer>
  )
}

export default MovieOnDashboard