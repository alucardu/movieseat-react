import React from 'react';
import {useMutation, useReactiveVar} from '@apollo/client';

import resolvers from '../../resolvers';
import {currentUserVar} from '../../cache';

const login = () => {
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const currentUser = useReactiveVar(currentUserVar);

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    currentUserVar({id: 0, email: '', isLoggedIn: false});
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await loginUserRes({variables: {
      email: formData.email,
      password: formData.password,
    }});
    if (data) {
      currentUserVar({
        email: data.loginUser.currentUser.email,
        id: data.loginUser.currentUser.id,
        isLoggedIn: true,
      });
      window.localStorage.setItem('token', data.loginUser.token);
      window.localStorage.setItem('user_id', data.loginUser.currentUser.id);
    }
  };

  return (
    <div>
      {
        (currentUser.isLoggedIn) ?
          <div><a href="" onClick={logout}>Welcome {currentUser.email}</a></div> :
          <form onSubmit={handleSubmit}>
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
