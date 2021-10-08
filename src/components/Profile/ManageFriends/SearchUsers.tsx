import React, {useEffect, useState, useMemo, useRef} from 'react';
import {FormControl, Input, InputLabel, List, ListItem, Typography} from '@mui/material';
import {useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';
import {debounce} from 'lodash';
import {Link} from 'react-router-dom';
import {Box} from '@mui/system';
import {makeStyles} from '@mui/styles';

import {IUser} from '../../../movieseat';

const useStyles = makeStyles({
  ListItemRoot: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'borderBottom': '1px solid #ebebeb',
    'borderRadius': '4px',
    '& a': {
      transition: 'margin-left 0.1s ease-in',
    },
    '&:hover': {
      'background': '#f6e0fa',
      '&> a': {
        marginLeft: '4px',
      },
    },
  },
});

export const SearchUser = () => {
  const classes = useStyles();
  const [results, setResults] = useState<IUser[]>([]);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const {loading, error, data: {returnUsers: users} = {}} = useQuery(resolvers.queries.returnUsers);

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

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);


  return (
    <Box className='profileBox'>
      <Typography variant='h6'>
        Add friends
      </Typography>
      <form autoComplete='off'>
        <FormControl>
          <InputLabel htmlFor="userQuery">User name</InputLabel>
          <Input inputRef={searchInput} id="userQuery" aria-describedby="my-helper-text" type="text" name="userQuery" onChange={handleChange} />
        </FormControl>
      </form>
      <List>
        { results.length === 0 && query.length > 0 && <li>No results found</li>}
        { results.map((user) => {
          return (
            <ListItem key={user.id} classes={{root: classes.ListItemRoot}}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
