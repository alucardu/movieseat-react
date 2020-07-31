import React from 'react';

const MovieOnDashboard = (movie) => {

  const imagePath = 'https://image.tmdb.org/t/p/w185/'

  return (
    <li key={movie.movie.id}>
      <img src={imagePath + movie.movie.poster_path} alt='poster' />
    </li>
  )
}

export default MovieOnDashboard