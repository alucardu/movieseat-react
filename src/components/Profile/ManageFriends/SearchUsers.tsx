import React, {useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';

import {useQuery} from '@apollo/client';

import debounce from 'lodash/debounce';

import {FormControl, Input, InputLabel, List, ListItem, Typography} from '@mui/material';

import {ProfileBox} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {IUser} from 'Src/movieseat';

export const SearchUser = () => {
  const [results, setResults] = useState<IUser[]>([]);
  const [query, setQuery] = useState('');
  const {loading, error, data: {returnUsers: users} = {}} = useQuery(resolvers.queries.returnUsers);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filteredResults = users
        .filter((user) => user.user_name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
        .map((filteredName) => {
          return filteredName;
        });

    setResults(filteredResults);
  }, [query]);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);

  if (loading) return (<div>Loading</div>);
  if (error) return (<div>Error</div>);

  return (
    <ProfileBox>
      <Typography variant='h6'>
        Add friends
      </Typography>
      <form autoComplete='off'>
        <FormControl>
          <InputLabel htmlFor="userQuery">User name</InputLabel>
          <Input data-cy='input_search_user' id="userQuery" aria-describedby="my-helper-text" type="text" name="userQuery" onChange={handleChange} />
        </FormControl>
      </form>
      <List data-cy='list_returned_users'>
        { results.length === 0 && query.length > 0 && <li>No results found</li>}
        { results.map((user) => {
          return (
            <ListItem key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link>
            </ListItem>
          );
        })}
      </List>
    </ProfileBox>
  );
};
