import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import IconButton from '@mui/material/IconButton';

import resolvers from '../../../resolvers';
import {currentUserVar} from '../../../cache';
import LoginIcon from '@mui/icons-material/Login';

import {FormControl, InputLabel, Input, FormHelperText, Button} from '@mui/material';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  loginIcon: {
    fontSize: '4rem',
  },
  loginForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'red',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
});

const login = () => {
  const classes = useStyles();
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setShowLoginForm(false);
    }
  };

  return (
    <div>
      <IconButton onClick={() => {
        setShowLoginForm(true);
      }}>
        <LoginIcon className={classes.loginIcon} />
      </IconButton>
      {
        showLoginForm &&
          <form className={classes.loginForm} onSubmit={login}>
            <FormControl>
              <InputLabel htmlFor="my-email">Email address</InputLabel>
              <Input id="my-email" aria-describedby="my-helper-text" type="email" onChange={handleChange} name="email"/>
              <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-password">Password</InputLabel>
              <Input id="my-password" aria-describedby="my-helper-text" type="password" onChange={handleChange} name="password"/>
              <FormHelperText id="my-helper-text">Keep it hidden.</FormHelperText>
            </FormControl>

            <Button type="submit">Login</Button>
          </form>
      }
    </div>
  );
};

export default login;
