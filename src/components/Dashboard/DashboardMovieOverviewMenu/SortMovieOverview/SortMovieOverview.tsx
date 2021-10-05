import React, {useState, useEffect} from 'react';
import {FormGroup, Checkbox, MenuItem, FormControlLabel} from '@mui/material';
import {Button, FormControl, InputLabel, Select} from '@mui/material/';
import {makeStyles} from '@mui/styles';
import localforage from 'localforage';
import {ISelectedSortType} from 'src/movieseat';
import {snackbarVar} from '../../../../cache';
import {useApolloClient} from '@apollo/client';
import {currentUserVar} from '../../../../cache';
import resolvers from '../../../../resolvers';

const useStyles = makeStyles({
  menuButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const SortMovieOverview = ( {toggleMenu}: {toggleMenu:
  React.Dispatch<React.SetStateAction<boolean>>}) => {
  const client = useApolloClient();

  const classes = useStyles();
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
      toggleMenu(false);
    });
  };

  return (
    <FormGroup>
      <FormControl fullWidth>
        <InputLabel id='sort-type-label'>Sort Type</InputLabel>
        <Select labelId='sort-type-label' id='selectedSortType' value={sortData.selectedSortType} label='Sort type' name='selectedSortType' onChange={handleChange}>
          <MenuItem value='release_date'>Release date</MenuItem>
          <MenuItem value='title'>Title</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel control={<Checkbox />} label='Ascending order' checked={sortData.orderType} name='orderType' onChange={handleChange}/>
      <Button variant='contained' onClick={submitChange} className={classes.menuButton} >Apply sorting</Button>
    </FormGroup>
  );
};

export default SortMovieOverview;
