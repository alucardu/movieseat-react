import React, {useState, useEffect} from 'react';
import {debounce} from 'lodash';

import {useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';
import {FormControl, Input, InputLabel} from '@mui/material';

import {IUser} from '../../../movieseat';

const ManageFriends = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IUser[]>([]);

  const {loading, error, data: {returnUsers: users} = {}} =
    useQuery(resolvers.queries.returnUsers);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filteredResults = users
        .filter((user) => user.user_name.includes(query))
        .slice(0, 5)
        .map((filteredName) => {
          return filteredName;
        });

    setResults(filteredResults);
  }, [query]);

  if (error) return (<div>Error</div>);
  if (loading) return (<div>Loading</div>);

  const handleChange = debounce((e) => {
    setQuery(e.target.value);
  }, 500);

  const followUser = (user) => {
    console.log(user);
  };

  return (
    <div>
      Manage friends:
      <form autoComplete='off'>
        <FormControl>
          <InputLabel htmlFor="userQuery">User name</InputLabel>
          <Input id="userQuery" aria-describedby="my-helper-text" type="text" onChange={handleChange} name="userQuery"/>
        </FormControl>
      </form>
      <ul>
        { results.length === 0 && query.length > 0 && <li>No results found</li>}
        { results.map((user) => {
          return (
            <li key={user.id} onClick={() => {
              followUser(user);
            }}>{user.user_name}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageFriends;
