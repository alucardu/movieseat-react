import React, { useRef } from 'react'
import styled from 'styled-components';

import { debounce } from 'lodash'

const SearchInput = styled.input`
  box-sizing: border-box;
  padding: 8px;
  margin: 12px 0 12px 0;
  width: 50%;
  border: none;
  font-size: 16px;
  &:focus {
    outline: none;
    color: #fff;
    background: #ff6a00;
    &::placeholder {
      color: #fff;
    }
  }
`
const MovieSearch = ( {createSearchResults} ) => {

  const searchInpuit = useRef<HTMLInputElement | null>(null)

  const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
  const baseurl = 'https://api.themoviedb.org/3/search/movie?'

  const clearResults = () => {
    if (searchInpuit && searchInpuit.current) {
      searchInpuit.current.value = '';
    }
    setMovieSearchResults()
  };

  const setMovieSearchResults = debounce(() => {
    if (searchInpuit && searchInpuit.current) {
      const query = searchInpuit.current.value;
      if (query) {
        fetch(baseurl + apikey + '&language=en-US&query=' + query + '&page=1&include_adult=false')
          .then(response => response.json())
          .then(data => createSearchResults(query, data.results))
      } else {
        createSearchResults(query, [])
      }
    }
  }, 500);

   return <SearchInput 
            ref={searchInpuit} 
            placeholder="Search for a movie..." 
            onChange={setMovieSearchResults} 
            onBlur={clearResults} />
}

export default MovieSearch