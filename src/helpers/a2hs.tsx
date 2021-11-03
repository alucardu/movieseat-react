import React from 'react';

import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';
import {Box, Button} from '@mui/material';

export const A2hs = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  return (
    <Box sx={{color: 'white'}}>
      device: {promptable?.platforms}
      {promptable?.platforms[0] !== 'web' && promptable && !isInstalled ? (
        <Button onClick={promptToInstall}>INSTALL APP</Button>
      ) : null
      }
    </Box>
  );
};
