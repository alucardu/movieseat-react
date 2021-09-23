import React, {useState, useMemo, useEffect, useRef} from 'react';
import {debounce} from 'lodash';
import {Link} from 'react-router-dom';

import {useMutation, useQuery} from '@apollo/client';
import resolvers from '../../../resolvers';
import {FormControl, Input, InputLabel} from '@mui/material';

import {snackbarVar} from '../../../cache';

import {IUser} from '../../../movieseat';

const ManageFriends = () => {
  const [query, setQuery] = useState('');
  const searchInput = useRef<HTMLInputElement | null>(null);

  const [results, setResults] = useState<IUser[]>([]);
  const [unfollowUserMutation] = useMutation(resolvers.mutations.UnfollowUser);

  const multipleQueries = () => {
    const res1 = useQuery(resolvers.queries.ReturnFollowedUsers,
        {variables: {userId: 1}});
    const res2 = useQuery(resolvers.queries.returnUsers);
    return [res1, res2];
  };

  const [
    {error: error1, loading: loading1, data: {returnFollowedUsers: followedUsers = {}} = {}},
    {error: error2, loading: loading2, data: {returnUsers: users = {}} = {}},
  ] = multipleQueries();

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

  if (error1 || error2) return (<div>Error</div>);
  if (loading1 || loading2) return (<div>Loading</div>);


  const unfollowUser = async (user) => {
    await unfollowUserMutation({
      variables: {id: user.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnFollowedUsers: () => {
              return [...data.unfollowUser];
            },
          },
        });
      },
    }).then(() => {
      snackbarVar({message: 'Unfollowed ' + user.user_name, severity: 'success'});
    });
  };

  return (
    <div>
      Manage friends:
      <form autoComplete='off'>
        <FormControl>
          <InputLabel htmlFor="userQuery">User name</InputLabel>
          <Input inputRef={searchInput} id="userQuery" aria-describedby="my-helper-text" type="text" name="userQuery" onChange={handleChange} />
        </FormControl>
      </form>
      <ul>
        { results.length === 0 && query.length > 0 && <li>No results found</li>}
        { results.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link></li>
          );
        })}
      </ul>
      Followed users:
      <ul>
        {followedUsers.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link>
              <span onClick={() => {
                unfollowUser(user);
              }}> X</span>
            </li>)
          ;
        })}
      </ul>
    </div>
  );
};

export default ManageFriends;
