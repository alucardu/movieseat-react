import React from 'react'
import styled from 'styled-components';

import { debounce } from 'lodash'

const Search = styled.input`
  color: green;
`
const MovieSearch = ( {addMovie }) => {  
    const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
    const baseurl = 'https://api.themoviedb.org/3/search/movie?'

    const searchTMDBapi = (e) => {
        e.persist()
        setMovieSearchResults(e);
    }

    const setMovieSearchResults = debounce((e) => {
        const query = e.target.value;
        fetch(baseurl + apikey + '&language=en-US&query=' + query + '&page=1&include_adult=false')
          .then(response => response.json())
          .then(data => addMovie(data.results))
   }, 500);

   return <Search placeholder="Search" onChange={searchTMDBapi}/>
}

export default MovieSearch