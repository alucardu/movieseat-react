import React, {useState, useEffect} from 'react';

import {useMutation, useQuery} from '@apollo/client';

import {IconButton, Box} from '@mui/material';

import {Rating} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {EAction} from 'Src/movieseat';
import {currentUserVar, snackbarVar} from 'Src/cache';
import {useCreateNotification} from 'Helpers/createNotification';

export const RateMovie = (props) => {
  const createNotification = useCreateNotification();
  const movie = {...props}.movie;
  const {error, loading, data: {returnMovieRating: rating} = {}} = useQuery(resolvers.queries.ReturnMovieRating, {
    variables: {
      userId: currentUserVar().id,
      movieId: movie.id,
    },
  });

  const [currentRating, setCurrentRating] = useState(0);
  const [addMovieRating] = useMutation(resolvers.mutations.AddMovieRating);

  const ratings = [
    {value: 1, filled: false},
    {value: 2, filled: false},
    {value: 3, filled: false},
    {value: 4, filled: false},
    {value: 5, filled: false},
  ];

  const [someRatings, setSomeRatings] = useState(ratings);

  const submitRating = async () => {
    addMovieRating({
      variables: {
        id: rating?.id,
        userId: currentUserVar().id,
        movieId: movie.id,
        value: currentRating,
      },
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnMovieRating: () => {
              return data.addMovieRating;
            },
          },
        });
      },
    }).then((res) => {
      const message = rating?.id ? 'Your rating has been updated.' : 'Your rating has been added';
      snackbarVar({message: message, severity: 'success'});
      createNotification.createNotification({
        user: currentUserVar(),
        action: EAction.Added_Rating,
        movie: movie,
        movieRating: res.data.addMovieRating,
      });
    });
  };


  const handleHover = (val) => {
    val ? setCurrentRating(val) : setCurrentRating(rating?.value || 0);
  };

  useEffect(() => {
    const ratings = someRatings.map((rating) => {
      rating.value <= currentRating ? rating.filled = true : rating.filled = false;
      return rating;
    });
    setSomeRatings(ratings);
  }, [currentRating]);

  useEffect(() => {
    if (rating) {
      const returnedrating = rating;
      const ratings = someRatings.map((rating) => {
        rating.value <= returnedrating.value ? rating.filled = true : rating.filled = false;
        return rating;
      });
      setSomeRatings(ratings);
    }
  }, [rating]);

  if (error) return (<div>Error</div>);
  if (loading) return (<div>Loading</div>);

  return (
    <Box data-cy='container_rating_options'>
      {someRatings.map((rating, i) => {
        return (
          <IconButton
            sx={{borderRadius: 0, paddingLeft: 0}}
            key={i}
            onClick={submitRating}
            onMouseEnter={() => {
              handleHover(i + 1);
            }}
            onMouseLeave={() => {
              handleHover(null);
            }}
          >
            <Rating
              className={rating.filled ? 'ratingHover' : ''}
            />
          </IconButton>
        );
      })}
    </Box>
  );
};
