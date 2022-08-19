import React, {useState, useEffect} from 'react';

import {useApolloClient, useLazyQuery} from '@apollo/client';

import PropTypes from 'prop-types';
import localforage, {setItem} from 'localforage';

import {Checkbox, FormControlLabel} from '@mui/material';

import {DashboardMovieOverMenuEl, FancyButton} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar} from 'Src/cache';

const FiltersWatched = ({handleClose}) => {
  const client = useApolloClient();

  const [filterState, setFilter] = useState(false);

  const returnFilteredState = async () => {
    return await localforage.getItem<boolean>('watchedAndReviewedFilterd') || false;
  };

  useEffect(() => {
    returnFilteredState().then((value) => {
      setFilter(value);
    });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.checked);
  };

  const [getMovies, {loading, error, data}] = useLazyQuery(
      resolvers.queries.ReturnMoviesFromUser);

  if (loading || error) {
    return (<div>test</div>);
  }

  client.cache.modify({
    fields: {
      moviesFromUser: () => {
        return data?.moviesFromUser;
      },
    },
  });

  if (data) {
    setTimeout(() => {
      handleClose();
    }, 0);
  }

  const submitChange = async () => {
    await localforage.setItem('watchedAndReviewedFilterd', filterState).then( async () => {
      snackbarVar({message: 'Filtering has been updated', severity: 'success'});
    });

    getMovies({variables: {
      userId: currentUserVar().id,
      filter: await localforage.getItem('watchedAndReviewedFilterd'),
    }});
  };

  return (
    <DashboardMovieOverMenuEl>
      <FormControlLabel control={<Checkbox />} label='Hide reviewed and watched movies' checked={filterState} name='hideReviewedAndWatchedMovies' onChange={handleChange}/>

      <FancyButton variant='contained' onClick={submitChange} >Apply filters</FancyButton>
    </DashboardMovieOverMenuEl>
  );
};

export default FiltersWatched;

FiltersWatched.propTypes = {
  handleClose: PropTypes.func,
};
