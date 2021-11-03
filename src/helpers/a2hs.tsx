import React, {useState} from 'react';

import {Button, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {A2hsStyles} from 'Src/styles';
import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';

export const A2hs = () => {
  const [visible, setvisible] = useState(true);
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  const handleClick = () => {
    setvisible(false);
  };

  return (
    <>
      {visible?
      <A2hsStyles>
        {visible && promptable && !isInstalled ? (
      <Button
        variant='contained'
        onClick={promptToInstall}>INSTALL APP</Button>
    ) : null
        }
        <IconButton onClick={handleClick}>
          <HighlightOffIcon
            sx={{color: 'black'}}
            fontSize='large'
          />
        </IconButton>
      </A2hsStyles> : null}
    </>
  );
};
