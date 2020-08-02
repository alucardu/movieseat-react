import React, { useState } from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import localforage from 'localforage';
import { orderBy } from 'lodash';

type IMovie = {
  title: string;
  poster_path: string;
  release_date: string;
  id: number;
  type?: any;
};


const SortMovieOverview = ( { toggleMenu }) => {

  const [sortType, setSortType] = useState('release_date');

  const handleChange = (event) => {
    setSortType(event.target.value);
    const type = event.target.value;

    const returnSortType = (movie) => {
      switch (type) {
        case 'release_date':
          return movie.release_date;      
        case 'title':
          return movie.title;
      }
    }

    localforage.getItem<IMovie []>('trackedMovies').then((value) => {
      let trackedMovies = value;
      trackedMovies = orderBy(trackedMovies, [movie => returnSortType(movie)], ['asc']);
      localforage.setItem('trackedMovies', trackedMovies)
    })

    toggleMenu(false)
  };

  return (
  <FormControl>
    <InputLabel id="demo-simple-select-label">Sort movies on dashboard by:</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={sortType}
      onChange={handleChange}
    >
      <MenuItem value={'release_date'}>Release date</MenuItem>
      <MenuItem value={'title'}>Title</MenuItem>
      {/* <MenuItem value={'Date added'}>Date added</MenuItem> */}
    </Select>
  </FormControl>
  )

}

export default SortMovieOverview