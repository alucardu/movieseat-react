import React from 'react';
import PropTypes from 'prop-types';
// import MovieOnDashboard from '../MovieOnDashboard/MovieOnDashboard';
// import styled from 'styled-components';
// import {chunk} from 'lodash';
import {IMovie} from '../../../movieseat';

import {useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';

// const MovieList = styled.ul`
//   list-style: none;
//   display: flex;
//   padding: 0;
//   margin: 0 12px;
// `;

const MovieOverview = () => {
  const {loading, error, data} = useQuery(resolvers.queries.ReturnAllMovies);

  const movies: IMovie[] = data?.movies;

  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error.message}</p>;

  console.log(movies);

  return (
    <div>
      {movies.map((movie) => {
        return movie.original_title;
      })}
    </div>
  );
};

MovieOverview.propTypes = {
  movies: PropTypes.array,
};


export default MovieOverview;
