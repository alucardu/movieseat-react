import React, {useState, useEffect, useRef} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import localforage from 'localforage';
import {orderBy} from 'lodash';
import {FormControlLabel, Checkbox} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';
import {IMovie, ISelectedSortType} from '../../../../movieseat';


const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const SortMovieOverview = ( {toggleMenu}: {toggleMenu:
  React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {enqueueSnackbar} = useSnackbar();
  const isMountedRef = useRef(true);
  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);
  useEffect(() => getOrderConfig(), []);

  const getOrderConfig = () => {
    localforage.getItem<ISelectedSortType>('sortType').then((value) => {
      if (isMountedRef.current) {
        setSortType(value ? value.selectedSortType : 'release_date');
        setOrderType(value ? value.orderType : true);
      }
    });
  };

  const [sortType, setSortType] = useState('');
  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  };

  const applySorting = () => {
    setSortType(sortType);
    const selectedSortType = sortType;

    const returnSortType = (movie) => {
      switch (selectedSortType) {
        case 'release_date':
          return movie.release_date;
        case 'title':
          return movie.title;
      }
    };

    storeOrderConfig(selectedSortType, orderType);

    localforage.getItem<IMovie []>('trackedMovies').then((value) => {
      let trackedMovies = value;
      trackedMovies = orderBy(trackedMovies, [(movie) => returnSortType(movie)], [orderType ? 'asc' : 'desc']);
      localforage.setItem('trackedMovies', trackedMovies);
    });

    toggleMenu(false);
    enqueueSnackbar('Applied sorting.', {
      variant: 'success',
      action: (
        <Button color="primary" size="small" onClick={() => alert('clicked on my custom action')}>
            Undo
        </Button>
      ),
    });
  };

  const [orderType, setOrderType] = useState(false);
  const handleSortOderChange = () => {
    setOrderType(!orderType);
    storeOrderConfig(sortType, orderType);
  };

  const storeOrderConfig = (selectedSortType, orderType) => {
    localforage.setItem('sortType', {selectedSortType, orderType});
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Sort movies on dashboard by:</InputLabel>
      <Select
        onChange={handleSortTypeChange}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortType}
      >
        <MenuItem value={'release_date'}>Release date</MenuItem>
        <MenuItem value={'title'}>Title</MenuItem>
        {/* <MenuItem value={'Date added'}>Date added</MenuItem> */}
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={orderType}
            onChange={handleSortOderChange}
            color="primary"
          />
        }
        label="List in ascending order"
      />
      <MyButton
        onClick={applySorting}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<CheckCircleIcon />}
      >
        Apply sorting
      </MyButton>
    </FormControl>
  );
};

export default SortMovieOverview;
