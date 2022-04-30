import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';

import {useMutation} from '@apollo/client';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import {FormControl, Button, TextField, Box} from '@mui/material';

import {LoginCheckBody, LoginFormContainer, LoginFormBody} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {currentUserVar, snackbarVar} from 'Src/cache';
import {EAction} from 'Src/movieseat';

import {useCreateNotification} from 'Helpers/createNotification';

type Props = {
  onRequestClose?: any
};
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

const schemaForgotPassword = yup.object().shape({
  email: yup.string().email().required(),
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

  const {
    control: forgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: {errors: errorsForgotPassword}} = useForm({
    resolver: yupResolver(schemaForgotPassword),
  });

  const history = useHistory();

  const [loginForm, setLoginForm] = useState('sign_in');
  const [loginUserRes] = useMutation(resolvers.mutations.LoginUser);
  const [signUpUserRes] = useMutation(resolvers.mutations.signupUser);
  const [forgotPasswordRes] = useMutation(resolvers.mutations.forgotPassword);

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
      if (onRequestClose) {
        onRequestClose(e);
      }
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
      if (onRequestClose) {
        onRequestClose(e);
      }
    } catch (e: any) {
      snackbarVar({message: `Sign up failed: ${e.message}`, severity: 'error'});
    }
  };

  const forgotPasswordSubmit: SubmitHandler<IFormInputs> = async (formData, e) => {
    try {
      await forgotPasswordRes({variables: {
        ...formData,
      }});

      history.push('/');
      snackbarVar({message: `An email with instructions has been send!`, severity: 'success'});
      if (onRequestClose) {
        onRequestClose(e);
      }
    } catch (e: any) {
      snackbarVar({message: `Something went wrong: ${e.message}`, severity: 'error'});
    }
  };

  const renderSwitch = (loginState) => {
    switch (loginState) {
      case 'sign_in':
        return (
          <LoginFormBody onSubmit={handleSubmitLogin(onLoginSubmit)} component="form">
            <FormControl>
              <Controller
                name='email'
                control={controlLogin}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_login_email'
                    autoComplete='email'
                    label='Email'
                    variant={'standard' as any}
                    error={!!errorsLogin.email}
                    helperText={errorsLogin.email ? errorsLogin.email?.message : ''}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <Controller
                name='password'
                control={controlLogin}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_login_password'
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
            </FormControl>

            <Button type="submit" variant="contained" data-cy='btn_login_submit'>Login</Button>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('sign_up');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2" data-cy='btn_sign_up'>
                Need an account?
              </Link>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('forgot_password');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2" data-cy='btn_forgot_password'>
                Forgot password?
              </Link>
            </Box>
          </LoginFormBody>
        );
      case 'sign_up':
        return (
          <LoginFormBody onSubmit={handleSubmitSignUp(onSignUpSubmit)} component="form">

            <FormControl>
              <Controller
                name='email'
                control={controlSignUp}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_sign_up_email'
                    autoComplete='email'
                    required={true}
                    label='Email'
                    variant={'standard' as any}
                    error={!!errorsSignUp.email}
                    helperText={errorsSignUp.email ? errorsSignUp.email?.message : ''}
                  />
                )}
              />
            </FormControl>

            {/* filler  */}
            <TextField sx={{display: 'none'}} />

            <FormControl>
              <Controller
                name='user_name'
                control={controlSignUp}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_sign_up_user_name'
                    autoComplete='user_name'
                    required={true}
                    label='User name'
                    variant={'standard' as any}
                    error={!!errorsSignUp.email}
                    helperText={errorsSignUp.email ? errorsSignUp.email?.message : ''}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <Controller
                name='password'
                control={controlSignUp}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_sign_up_password'
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
            </FormControl>

            <FormControl>
              <Controller
                name='confirmPassword'
                control={controlSignUp}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_sign_up_confirm_password'
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
            </FormControl>

            <Button type="submit" variant="contained" data-cy='btn_sign_up_submit'>Sign up!</Button>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('sign_in');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2">
                Sign in?
              </Link>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('forgot_password');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2" data-cy='btn_forgot_password'>
                Forgot password?
              </Link>
            </Box>
          </LoginFormBody>
        );

      case 'forgot_password':
        return (
          <LoginFormBody onSubmit={handleSubmitForgotPassword(forgotPasswordSubmit)} component="form">
            <FormControl>
              <Controller
                name='email'
                control={forgotPassword}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_login_email'
                    autoComplete='email'
                    label='Email'
                    variant={'standard' as any}
                    error={!!errorsForgotPassword.email}
                    helperText={errorsForgotPassword.email ? errorsForgotPassword.email?.message : ''}
                  />
                )}
              />
            </FormControl>
            <Button type="submit" variant="contained" data-cy='btn_sign_up_submit'>Send!</Button>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('sign_in');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2">
                Sign in?
              </Link>
              <Link onClick={(e) => {
                e.preventDefault(); setLoginForm('sign_up');
              }} component='button' sx={{marginTop: '16px', color: 'white', textAlign: 'left'}} href="" variant="body2" data-cy='btn_sign_up'>
                Need an account?
              </Link>
            </Box>
          </LoginFormBody>
        );
    }
  };

  return (
    <LoginFormContainer>
      <LoginCheckBody />
      {renderSwitch(loginForm)}
    </LoginFormContainer>
  );
};
