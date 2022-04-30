import {useMutation} from '@apollo/client';
import {Box, Button} from '@mui/material';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {currentUserVar, snackbarVar} from 'Src/cache';
import resolvers from 'Src/resolvers';
import {LoginCheckBody, LoginFormBody, LoginFormContainer, LoginModal} from 'Src/styles';
import {EAction} from 'Src/movieseat';
import {useCreateNotification} from 'Helpers/createNotification';

type Props = {
  onRequestClose?: any
};

interface IFormInputs {}

export const ActivateAccount = ({onRequestClose} : Props) => {
  const createNotification = useCreateNotification();
  const {id: paramToken} = useParams<{id: string}>();

  const history = useHistory();

  const [activateUser] = useMutation(resolvers.mutations.activateUser);

  const activateAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await activateUser({variables: {
        token: paramToken,
      }});

      currentUserVar({
        ...data.activateUser,
        isLoggedIn: true,
      });

      console.log(currentUserVar());

      createNotification.createNotification({
        user: currentUserVar(),
        action: EAction.Onboard,
      });

      history.push('/');

      snackbarVar({message: `You've activated your account!`, severity: 'success'});
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
          <LoginFormBody onSubmit={activateAccountSubmit} component="form">
            <Button type="submit" variant="contained" data-cy='btn_sign_up_submit'>Activate your account!</Button>
          </LoginFormBody>
        </LoginFormContainer>
      </Box>
    </LoginModal>
  );
};
