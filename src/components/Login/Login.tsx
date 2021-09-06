import React, {useEffect} from 'react';
import {useMutation, useReactiveVar} from '@apollo/client';

import resolvers from '../../resolvers';
import {currentUserVar, moviesVar} from '../../cache';
import returnMoviesFromUserHook from '../../customHooks/returnMoviesFromUserHook';

const login = () => {
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const [logoutUser] = useMutation(resolvers.mutations.LogoutUser);
  const currentUser = useReactiveVar(currentUserVar);
  const movies = returnMoviesFromUserHook();

  useEffect(() => {
    moviesVar(movies);
  });

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    currentUserVar({id: 0, email: '', isLoggedIn: false});
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const login = async (e) => {
    e.preventDefault();

    const {data} = await loginUserRes({variables: {
      ...formData,
    }});
    if (data) {
      currentUserVar({
        ...data.loginUser,
        isLoggedIn: true,
      });
    }
  };

  return (
    <div>
      {
        (currentUser.isLoggedIn) ?
          <div><a href="" onClick={logout}>Welcome {currentUser.email}</a></div> :
          <form onSubmit={login}>
            <label>Email</label>
            <input type="email" onChange={handleChange} name="email"/>
            <label>Password</label>
            <input type="password" onChange={handleChange} name="password"/>
            <button type="submit">Login</button>
          </form>
      }
    </div>
  );
};

export default login;
