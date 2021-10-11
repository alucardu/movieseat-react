import React, {useEffect, useState} from 'react';

import {Box} from '@mui/system';
import {IMovie} from '../../movieseat';
import MovieOnDashboard from '../Dashboard/MovieOnDashboard/MovieOnDashboard';
import {List} from '@mui/material';

const baseurl = 'https://api.themoviedb.org/3/movie/upcoming?';
const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
const rest = '&language=en-US&page=1';

const type = 'suggestion';

export const MovieSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(baseurl + apikey + rest)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.results);
        });
  }, []);

  return (
    <Box sx={{padding: '16px'}}>
      <List data-cy='list_movie_suggestions' sx={{display: 'flex', flexWrap: 'wrap'}}>
        {suggestions.map((movie: IMovie) => {
          return (
            <MovieOnDashboard key={movie.id} movie={movie} type={type} />
          );
        })}
      </List>
    </Box>
  );
};
