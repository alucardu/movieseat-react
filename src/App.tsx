import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {useQuery, useReactiveVar} from '@apollo/client';

import {Box, Button} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';
import {currentUserVar} from 'Src/cache';
import resolvers from 'Src/resolvers';
import SnackbarStack from 'Helpers/snackbar';

import Header from 'Components/Header/Header';
import Profile from 'Components/Profile/Profile';
import DashboardComponent from 'Components/Dashboard/DashboardComponent';
import {DrawerContainer} from 'Components/Drawer/DrawerContainer';
import {MovieSuggestions} from 'Components/MovieSuggestions/MovieSuggestions';
import {RandomBackground} from 'Components/Dashboard/RandomBackground/RandomBackground';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const App = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const currentUser = useReactiveVar(currentUserVar);
  const {error, loading, data: {returnUser: user} = {}} = useQuery(
      resolvers.queries.ReturnUser, {
        fetchPolicy: 'no-cache',
      });

  useEffect(() => {
    if (user) {
      currentUserVar({...user, isLoggedIn: true});
    }
  }, [user]);


  // useEffect(() => {
  //   window.addEventListener('beforeinstallprompt', function(e) {
  //     // log the platforms provided as options in an install prompt
  //     console.log(e.platforms); // e.g., ["web", "android", "windows"]
  //     e.userChoice.then(function(choiceResult) {
  //       console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  //     });
  //   });
  // }, []);

  if (loading) return (<div>Loading</div>);
  if (error) return (<div>Error</div>);

  return (
    <Router>
      <Box
        sx={{display: isMdUp ? 'flex' : null}}
      >
        {promptable && !isInstalled ? (
          <Button onClick={promptToInstall}>INSTALL APP</Button>
        ) : null
        }
        <DrawerContainer />
        <Header />
        <Switch>
          <Route exact path='/'>
            {currentUser.isLoggedIn ? <DashboardComponent /> : <RandomBackground />}
          </Route>
          <Route exact path='/suggestions'>
            <MovieSuggestions />
          </Route>
          <Route path='/profile/:id'>
            <Profile />
          </Route>
        </Switch>
        <SnackbarStack />
      </Box>
    </Router>
  );
};

export default App;

