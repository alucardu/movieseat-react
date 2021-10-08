import React, {useState} from 'react';
import {FormControl, Button, TextField} from '@mui/material';
import {useHistory} from 'react-router-dom';
import Link from '@mui/material/Link';
import {useMutation} from '@apollo/client';

import resolvers from '../../resolvers';
import {currentUserVar, snackbarVar} from '../../cache';

import {styled} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import Box from '@mui/material/Box';

import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {useCreateNotification} from '../../helpers/createNotification';
import {EAction} from '../../movieseat';

type Props = {
  onRequestClose: any
};

const useStyles = makeStyles({
  '& MuiInput-underline': {
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

  'btnDisabled': {
    '&:disabled': {
      color: 'rgb(255 255 255 / 50%)',
      background: 'rgb(103 130 255 / 50%)',
    },
  },
});

const FormControlContainer = styled(FormControl)(() => ({
  'label': {
    color: 'navajowhite',
  },
  '.MuiInput-underline': {
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
}));

const FormInput = styled(TextField)(({theme}) => ({
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

const FormContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)',
}));

const FormBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  // eslint-disable-next-line camelcase
  user_name: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const schemaSignUp = yup.object().shape({
  email: yup.string().email().required(),
  user_name: yup.string().min(4).max(12).required(),
  password: yup.string().min(4).max(20).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match!').required(),
});

export const LoginForm = ({onRequestClose} : Props) => {
  const createNotification = useCreateNotification();
  const {
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
    formState: {errors: errorsLogin}} = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    control: controlSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: {errors: errorsSignUp}} = useForm({
    resolver: yupResolver(schemaSignUp),
  });

  const classes = useStyles();
  const history = useHistory();

  const [loginForm, setLoginForm] = useState(true);
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const [signUpUserRes] = useMutation(resolvers.mutations.signupUser);

  const onLoginSubmit: SubmitHandler<IFormInputs> = async (formData, e) => {
    try {
      const {data} = await loginUserRes({variables: {
        ...formData,
      }});

      currentUserVar({
        ...data.loginUser,
        isLoggedIn: true,
      });

      history.push('/');
      snackbarVar({message: `Welcome back ${currentUserVar().user_name}`, severity: 'success'});
      onRequestClose(e);
    } catch (e: any) {
      snackbarVar({message: `Login failed: ${e.message}`, severity: 'error'});
    }
  };
  const onSignUpSubmit: SubmitHandler<IFormInputs> = async (formData, e) => {
    try {
      const {data} = await signUpUserRes({variables: {
        ...formData,
      }});

      currentUserVar({
        ...data.signupUser,
        isLoggedIn: true,
      });

      createNotification.createNotification({
        user: currentUserVar(),
        action: EAction.Onboard,
      });

      history.push('/');
      snackbarVar({message: `Welcome ${currentUserVar().user_name}`, severity: 'success'});
      onRequestClose(e);
    } catch (e: any) {
      snackbarVar({message: `Sign up failed: ${e.message}`, severity: 'error'});
    }
  };

  return (
    <FormContainer>
      <CheckBody />
      {loginForm ?
      <FormBody onSubmit={handleSubmitLogin(onLoginSubmit)} component="form">
        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='email'
            control={controlLogin}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='email'
                label='Email'
                variant={'standard' as any}
                error={!!errorsLogin.email}
                helperText={errorsLogin.email ? errorsLogin.email?.message : ''}
              />
            )}
          />
        </FormControlContainer>

        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='password'
            control={controlLogin}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='password'
                required={true}
                type="password"
                label='Password'
                variant={'standard' as any}
                error={!!errorsLogin.password}
                helperText={errorsLogin.password ? errorsLogin.password?.message : null}
              />
            )}
          />
        </FormControlContainer>

        <Button type="submit" variant="contained">Login</Button>

        <Link onClick={(e) => {
          e.preventDefault(); setLoginForm(false);
        }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2">
      Need an account?
        </Link>
      </FormBody> :
      <FormBody onSubmit={handleSubmitSignUp(onSignUpSubmit)} component="form">

        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='email'
            control={controlSignUp}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='email'
                required={true}
                label='Email'
                variant={'standard' as any}
                error={!!errorsSignUp.email}
                helperText={errorsSignUp.email ? errorsSignUp.email?.message : ''}
              />
            )}
          />
        </FormControlContainer>

        {/* filler  */}
        <TextField sx={{display: 'none'}} />

        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='user_name'
            control={controlSignUp}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='user_name'
                required={true}
                label='User name'
                variant={'standard' as any}
                error={!!errorsSignUp.email}
                helperText={errorsSignUp.email ? errorsSignUp.email?.message : ''}
              />
            )}
          />
        </FormControlContainer>

        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='password'
            control={controlSignUp}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='new-password'
                required={true}
                type="password"
                label='Password'
                variant={'standard' as any}
                error={!!errorsSignUp.password}
                helperText={errorsSignUp.password ? errorsSignUp.password?.message : null}
              />
            )}
          />
        </FormControlContainer>

        <FormControlContainer sx={{pb: 2}}>
          <Controller
            name='confirmPassword'
            control={controlSignUp}
            defaultValue=''
            render={({field}) => (
              <FormInput
                {...field}
                autoComplete='new-password'
                required={true}
                type="password"
                label='Password'
                variant={'standard' as any}
                error={!!errorsSignUp.confirmPassword}
                helperText={errorsSignUp.confirmPassword ? errorsSignUp.confirmPassword?.message : null}
              />
            )}
          />
        </FormControlContainer>

        <Button classes={{disabled: classes.btnDisabled}} type="submit" variant="contained">Sign up!</Button>

        <Link onClick={(e) => {
          e.preventDefault(); setLoginForm(true);
        }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2">
        Sign in?
        </Link>
      </FormBody>
      }
    </FormContainer>
  );
};
