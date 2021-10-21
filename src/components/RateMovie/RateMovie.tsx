import React, {useState, useEffect} from 'react';

import {useMutation, useQuery} from '@apollo/client';

import classNames from 'classnames';

import {makeStyles} from '@mui/styles';
import {IconButton, Popover, Typography, Box} from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';


import resolvers from 'Src/resolvers';
import {EAction} from 'Src/movieseat';
import {currentUserVar, snackbarVar} from 'Src/cache';
import {useCreateNotification} from 'Helpers/createNotification';

const useStyles = makeStyles({

  ratingHover: {
    color: '#ff8d05',
  },

  ratings: {
  },
});

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
  const classes = useStyles();

  const ratings = [
    {value: 1, filled: false},
    {value: 2, filled: false},
    {value: 3, filled: false},
    {value: 4, filled: false},
    {value: 5, filled: false},
  ];

  const [someRatings, setSomeRatings] = useState(ratings);

  const RatingContainer = classNames({
    [`${classes.ratings}`]: true,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleHover = (value) => {
    setCurrentRating(value);
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

  const RateMovieContent = () => {
    return (
      <Box>
        <Typography variant='body2'>
          How would you rate the movie?
        </Typography>
        <Box
          className={RatingContainer}
          data-cy='container_rating_options'
        >
          {
            someRatings.map((rating, i) => {
              return (
                <IconButton
                  key={i}
                  onClick={submitRating}
                >
                  <GradeIcon
                    className={rating.filled ? classes.ratingHover : ''}
                    onMouseEnter={() => {
                      handleHover(rating.value);
                    }}
                  />
                </IconButton>
              );
            })
          }
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        data-cy='btn_open_movie_rating'
      >
        <GradeIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

        anchorReference='anchorEl'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <RateMovieContent />
      </Popover>
    </Box>
  );
};
