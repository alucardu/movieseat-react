import React from 'react';
import {useParams} from 'react-router';

import {useQuery} from '@apollo/client';

import {Box, Typography, CardMedia} from '@mui/material';

import {MovieDetailsStyle} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {RateMovie} from 'Components/Ratings/RateMovie/RateMovie';
import {AggregatedMovieRating} from 'Components/Ratings/AggregatedMovieRating/AggregatedMovieRating';

export const MovieDetails = () => {
  const {id: paramId} = useParams<{id: string}>();

  const {error, loading, data: {returnMovieDetails: movie} = {}} =
    useQuery(resolvers.queries.ReturnMovieDetails, {
      variables: {movieId: parseInt(paramId)},
    });

  console.log(movie);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  const getReleaseDate = () => {
    return movie.release_date.length > 0 ? new Date(movie.release_date).toLocaleDateString('nl-NL', options) : 'No release data available yet.';
  };

  if (error) return <Box>Error</Box>;
  if (loading) return <Box>Loading</Box>;

  return (
    <MovieDetailsStyle
      movie={movie}
    >
      <Box className='backdrop_container'>
        <CardMedia
          component="img"
          image={`${'https://image.tmdb.org/t/p/original/' + movie.backdrop_path}`}
        />
        <Box sx={{padding: '8px', position: 'absolute', top: 0}}>
          <AggregatedMovieRating movie={movie}/>
          <Typography variant="h4" component="h2">
            {movie.original_title}
          </Typography>
          <Typography variant='h6'>
            {getReleaseDate()} (NL)
          </Typography>
          <Typography variant='body1'>
            {movie.tagline}
          </Typography>
          <RateMovie movie={movie}/>
          <Typography id="transition-modal-description" variant='body2'>
            {movie.overview}
          </Typography>
          {movie.runtime > 0 && <Typography variant='body2'>Runtime: {movie.runtime} minutes</Typography>}
        </Box>
      </Box>

    </MovieDetailsStyle>
  );
};
