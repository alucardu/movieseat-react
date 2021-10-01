import React, {useState} from 'react';
import {FormControl, InputLabel, Input, Button, Typography} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/client';

import resolvers from '../../resolvers';
import {currentUserVar, snackbarVar} from '../../cache';

import {styled} from '@mui/material/styles';
import {makeStyles} from '@material-ui/styles';
import Box from '@mui/material/Box';

type Props = {
  onRequestClose: (event: React.MouseEvent<HTMLElement>) => void
};

const useStyles = makeStyles({
  underline: {
    '&:before': {
      borderBottom: '1px solid grey',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid blue',
    },
    '&:after': {
      borderBottom: '2px solid yellow',
    },
  },
});

const FormInput = styled(Input)(({theme}) => ({
  'input': {
    'color': theme.palette.grey[200],
    '&:-webkit-autofill': {
      transitionDelay: '99999s',
      transitionProperty: 'background-color, color',
    },
  },
}));

const CheckBody = styled(Box)(() => ({
  'background': '#fff',
  'width': '14rem',
  'height': '2.8rem',
  'margin': '8rem 0 8rem 4rem',
  'transform': 'rotate(-45deg)',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '100%',
    width: '2.8rem',
    height: '5.2rem',
    background: '#fff',
    boxShadow: 'inset -0.2rem -2rem 2rem rgb(0 0 0 / 20%)',
  },
}));

const FormBody = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)',
}));

export const LoginForm = ({onRequestClose} : Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const [error, setError] = useState({message: '', show: false});

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

    try {
      const {data} = await loginUserRes({variables: {
        ...formData,
      }});

      currentUserVar({
        ...data.loginUser,
        isLoggedIn: true,
      });

      history.push('/');
      snackbarVar({message: `Welcome ${currentUserVar().user_name}`, severity: 'success'});
      onRequestClose(e);
    } catch (e: any) {
      setError({message: e.message, show: true});
      snackbarVar({message: `Login failed: ${e.message}`, severity: 'error'});
    }
  };

  return (
    <FormBody onSubmit={login} component="form">
      <CheckBody />
      <FormControl sx={{pb: 2}} variant="standard">
        <InputLabel sx={{color: 'common.white'}} color='secondary' htmlFor="my-email">Email address</InputLabel>
        <FormInput classes={{underline: classes.underline}} id="my-email" aria-describedby="my-helper-text" type="email" onChange={handleChange} name="email"/>
      </FormControl>

      <FormControl sx={{pb: 2}} variant="standard">
        <InputLabel sx={{color: 'common.white'}} color='secondary' htmlFor="my-password">Password</InputLabel>
        <FormInput classes={{underline: classes.underline}} id="my-password" aria-describedby="my-helper-text" type="password" onChange={handleChange} name="password"/>
      </FormControl>

      <Button type="submit" variant="contained">Login</Button>
      <Typography pt={2} color="error.main" variant='body2' component='span'>{error.message}</Typography>
    </FormBody>
  );
};
