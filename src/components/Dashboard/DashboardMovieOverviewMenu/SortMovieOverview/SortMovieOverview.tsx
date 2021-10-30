import React, {useState, useEffect} from 'react';

import {useApolloClient} from '@apollo/client';

import PropTypes from 'prop-types';
import localforage from 'localforage';

import {Checkbox, MenuItem, FormControlLabel, FormControl, InputLabel, Select} from '@mui/material';

import {DashboardMovieOverMenuEl, FancyButton} from 'Src/styles';
import {ISelectedSortType} from 'Src/movieseat';
import {snackbarVar, currentUserVar} from 'Src/cache';
import resolvers from 'Src/resolvers';

const SortMovieOverview = ({handleClose})=> {
  const client = useApolloClient();

  const initalSortData: ISelectedSortType = {selectedSortType: 'release_date', orderType: true};
  const [sortData, setSortdata] = useState(initalSortData);

  const returnMovieSort = async () => {
    return await localforage.getItem<ISelectedSortType>('movieSort') || initalSortData;
  };

  useEffect(() => {
    returnMovieSort().then((value) => {
      setSortdata(value);
    });
  }, []);


  const handleChange = (e) => {
    setSortdata({
      ...sortData,
      [e.target.name]: e.target.value.length > 0 ?
        e.target.value : e.target.checked,
    });
  };

  const submitChange = () => {
    const movies = client.readQuery({
      query: resolvers.queries.ReturnMoviesFromUser,
      variables: {userId: currentUserVar().id}});

    const reversedMovies = [...movies.moviesFromUser];
    reversedMovies.reverse();

    client.cache.modify({
      fields: {
        moviesFromUser: () => {
          return reversedMovies;
        },
      },
    });

    localforage.setItem('movieSort', sortData).then( async () => {
      snackbarVar({message: 'Sorting has been updated', severity: 'success'});
    });

    handleClose();
  };

  return (
    <DashboardMovieOverMenuEl>
      <FormControl fullWidth>
        <InputLabel id='sort-type-label'>Sort Type</InputLabel>
        <Select labelId='sort-type-label' id='selectedSortType' value={sortData.selectedSortType} label='Sort type' name='selectedSortType' onChange={handleChange}>
          <MenuItem value='release_date'>Release date</MenuItem>
          <MenuItem value='title'>Title</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel control={<Checkbox />} label='Ascending order' checked={sortData.orderType} name='orderType' onChange={handleChange}/>
      <FancyButton variant='contained' onClick={submitChange} >Apply sorting</FancyButton>
    </DashboardMovieOverMenuEl>
  );
};

export default SortMovieOverview;

SortMovieOverview.propTypes = {
  handleClose: PropTypes.func,
};
