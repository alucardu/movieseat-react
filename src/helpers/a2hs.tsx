import React from 'react';

import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';
import {Box, Button} from '@mui/material';

export const A2hs = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  console.log(promptable);

  return (
    <Box>
      {promptable?.platforms[0] !== 'web' && promptable && !isInstalled ? (
        <Button onClick={promptToInstall}>INSTALL APP</Button>
      ) : null
      }
    </Box>
  );
};
