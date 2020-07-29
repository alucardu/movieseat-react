import React from 'react';

const MovieResultList = (props) => {
  return (
    <div>
      <ul>
        {props.movieList.map(movie => {
            return (<li key={movie.id}>{movie.original_title}</li>)
        })}
      </ul>
    </div>
  )
}

export default MovieResultList