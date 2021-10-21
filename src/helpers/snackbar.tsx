import React, {useState, useEffect} from 'react';

import {useReactiveVar} from '@apollo/client';

import {Snackbar, Alert} from '@mui/material/';

import {snackbarVar} from 'Src/cache';
import {ISnackbar} from 'Src/movieseat';


const AlertWrapper = (props) => {
  return <Alert elevation={6} variant='filled' {...props} />;
};

const SnackbarStack = () => {
  const [snackPack, setSnackPack] = useState<ISnackbar[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<ISnackbar>();

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({...snackPack[0]});
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo]);

  useEffect(() => {
    if (snackbarVar().message.length > 0) setSnackPack([{...snackbarVar()}]);
  }, [useReactiveVar(snackbarVar)]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionProps={{onExited: handleExited} }
      >
        <div>
          <AlertWrapper severity={messageInfo?.severity}>
            {messageInfo?.message}
          </AlertWrapper>
        </div>
      </Snackbar>
    </div>
  );
};

export default SnackbarStack;
