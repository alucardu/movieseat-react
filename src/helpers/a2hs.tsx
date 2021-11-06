import React, {useState, useEffect} from 'react';

import {useReactiveVar} from '@apollo/client';

import {Button, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {a2hsVar} from 'Src/cache';
import {A2hsStyles} from 'Src/styles';
import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';

export const A2hs = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [visible, setVisible] = useState(true);
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  const handleClick = () => {
    setShowAnimation(false);
    setTimeout(() => {
      a2hsVar(false);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 1000);
  }, []);

  useEffect(() => {
    promptable ? setVisible(true) : setVisible(false);
  }, [promptable]);
  return (
    <>
      {visible && !isInstalled ?
      <A2hsStyles className={showAnimation ? 'animation' : ''}>
        <Button
          variant='contained'
          color='secondary'
          onClick={promptToInstall}>INSTALL APP</Button>
        <IconButton onClick={handleClick}>
          <HighlightOffIcon
            sx={{color: 'white'}}
            fontSize='large'
          />
        </IconButton>
      </A2hsStyles> : null}
    </>
  );
};
