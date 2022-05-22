import React from 'react';
import {useParams} from 'react-router';

import {useQuery} from '@apollo/client';

import {Box, Typography, CardMedia} from '@mui/material';

import {MovieDetailsStyle} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {RateMovie} from 'Components/Ratings/RateMovie/RateMovie';
import {AggregatedMovieRating} from 'Components/Ratings/AggregatedMovieRating/AggregatedMovieRating';
import {IMovie} from 'Src/movieseat';
import {TrailerSlider} from 'Components/TrailerSlider/TrailerSlider';

export const MovieDetails = () => {
  const {id: paramId} = useParams<{id: string}>();
  let movie: IMovie;

  const {error, loading, data} =
    useQuery(resolvers.queries.ReturnMovieDetails, {
      variables: {movieId: parseInt(paramId)},
    });

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  if (data === undefined) {
    return <Box>Error</Box>;
  } else {
    movie = data.returnMovieDetails;
  }
  if (error) return <Box>Error</Box>;
  if (loading) return <Box>Loading</Box>;

  const getReleaseDate = () => {
    return movie.release_date.length > 0 ? new Date(movie.release_date).toLocaleDateString('nl-NL', options) : 'No release data available yet.';
  };

  return (
    <MovieDetailsStyle
      movie={movie}
    >
      <Box sx={{position: 'relative'}}>
        <Box className='img_container'>
          <CardMedia
            component="img"
            image={`${'https://image.tmdb.org/t/p/original/' + movie.backdrop_path}`}
          />
        </Box>
        <Box className="text-container">
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
          {movie.runtime > 0 && <Typography variant='body2'>Runtime: {movie.runtime} minutes</Typography>}
          <RateMovie movie={movie}/>
          <Typography id="transition-modal-description" variant='body2'>
            {movie.overview}
          </Typography>
        </Box>
        <TrailerSlider videos={movie.movieVideo}/>
      </Box>

    </MovieDetailsStyle>
  );
};
