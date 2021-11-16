import React from 'react';

import {useQuery} from '@apollo/client';

import resolvers from 'Src/resolvers';
import {AggregatedMovieRatingStyle} from 'Src/styles';

export const AggregatedMovieRating = (props) => {
  const movie = {...props}.movie;

  const {error, loading, data: {returnAggregatedMovieRating: aggregatedMovieRating} = {}} = useQuery(resolvers.queries.ReturnAggregatedMovieRating, {
    variables: {
      movieId: movie.id,
    },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;

  return (
    <AggregatedMovieRatingStyle>
      Average rating <span>{aggregatedMovieRating ? aggregatedMovieRating : 'na'}</span>
    </AggregatedMovieRatingStyle>
  );
};
