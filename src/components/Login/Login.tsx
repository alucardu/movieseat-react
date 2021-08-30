import React from 'react';
import {useMutation} from '@apollo/client';

import resolvers from '../../resolvers';

const login = () => {
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });
  const [formData, updateFormData] = React.useState(initialFormData);


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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" onChange={handleChange} name="email"/>
      <label>Password</label>
      <input type="password" onChange={handleChange} name="password"/>
      <button type="submit">Login</button>
    </form>
  );
};

export default login;
