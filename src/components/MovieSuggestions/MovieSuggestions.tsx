import React, {useEffect, useState} from 'react';

import {Box} from '@mui/system';
import MovieOverview from '../Dashboard/MovieOverview/MovieOverview';

const baseurl = 'https://api.themoviedb.org/3/movie/upcoming?';
const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
const rest = '&language=en-US&page=1';

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
    <Box sx={{padding: '16px', width: '100vw'}}>
      <MovieOverview type='suggestion' movies={suggestions}/>
    </Box>
  );
};
