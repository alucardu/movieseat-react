import React from 'react';

import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';
import {Box, Button} from '@mui/material';

export const A2hs = () => {
  const theme = useTheme();
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const isMdUp = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{color: 'white'}}>
      {isMdUp && promptable && !isInstalled ? (
        <Button onClick={promptToInstall}>INSTALL APP</Button>
      ) : null
      }
    </Box>
  );
};
