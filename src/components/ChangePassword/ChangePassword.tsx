import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {useMutation} from '@apollo/client';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {Box, Button, FormControl, TextField} from '@mui/material';

import {LoginCheckBody, LoginFormBody, LoginFormContainer, LoginModal} from 'Src/styles';
import resolvers from 'Src/resolvers';
import {snackbarVar} from 'Src/cache';

type Props = {
  onRequestClose?: any
};

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

const schemaChangePassword = yup.object().shape({
  password: yup.string().min(4).max(20).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match!').required(),
});

export const ChangePassword = ({onRequestClose} : Props) => {
  const {id: paramToken} = useParams<{id: string}>();
  const {
    control: controlChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: {errors: errorsChangePassword}} = useForm({
    resolver: yupResolver(schemaChangePassword),
  });

  const history = useHistory();

  const [changePassword] = useMutation(resolvers.mutations.changePassword);

  const onChangePasswordSubmit: SubmitHandler<IFormInputs> = async (formData, e) => {
    try {
      await changePassword({variables: {
        ...formData,
        token: paramToken,
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

  return (
    <LoginModal open={true}>
      <Box>
        <LoginFormContainer>
          <LoginCheckBody />
          <LoginFormBody onSubmit={handleSubmitChangePassword(onChangePasswordSubmit)} component="form">
            <FormControl>
              <Controller
                name='password'
                control={controlChangePassword}
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
                    error={!!errorsChangePassword.password}
                    helperText={errorsChangePassword.password ? errorsChangePassword.password?.message : null}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <Controller
                name='confirmPassword'
                control={controlChangePassword}
                defaultValue=''
                render={({field}) => (
                  <TextField
                    {...field}
                    data-cy='input_sign_up_confirm_password'
                    autoComplete='new-password'
                    required={true}
                    type="password"
                    label='Confirm password'
                    variant={'standard' as any}
                    error={!!errorsChangePassword.confirmPassword}
                    helperText={errorsChangePassword.confirmPassword ? errorsChangePassword.confirmPassword?.message : null}
                  />
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" data-cy='btn_sign_up_submit'>Send</Button>
          </LoginFormBody>
        </LoginFormContainer>
      </Box>
    </LoginModal>
  );
};
