import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {useQuery, useReactiveVar} from '@apollo/client';

import {Box} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {currentUserVar} from 'Src/cache';
import resolvers from 'Src/resolvers';
import SnackbarStack from 'Helpers/snackbar';

import Header from 'Components/Header/Header';
import Profile from 'Components/Profile/Profile';
import DashboardComponent from 'Components/Dashboard/DashboardComponent';
import {DrawerContainer} from 'Components/Drawer/DrawerContainer';
import {MovieSuggestions} from 'Components/MovieSuggestions/MovieSuggestions';
import {RandomBackground} from 'Components/Dashboard/RandomBackground/RandomBackground';
import {A2hs} from 'Helpers/a2hs';

import {Button, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {a2hsVar} from 'Src/cache';
import {A2hsStyles} from 'Src/styles';
import {useAddToHomescreenPrompt} from 'Helpers/useAddToHomescreenPrompt';

const App = () => {
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


  const [showAnimation, setShowAnimation] = useState(false);
  const visible = useReactiveVar(a2hsVar);
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  const handleClick = () => {
    setShowAnimation(false);
    setTimeout(() => {
      a2hsVar(false);
    }, 1000);
  };

  useEffect(() => {
    setShowAnimation(true);
    console.log(isInstalled);
  }, []);

  if (loading) return (<div>Loading</div>);
  if (error) return (<div>Error</div>);

  return (
    <Router>
      <Box
        sx={{display: isMdUp ? 'flex' : null}}
      >
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
        <>
          {visible && !isInstalled ?
      <A2hsStyles className={showAnimation ? 'animation' : ''}>
        {visible && promptable && !isInstalled ? (
      <Button
        variant='contained'
        color='secondary'
        onClick={promptToInstall}>INSTALL APP</Button>
    ) : null
        }
        <IconButton onClick={handleClick}>
          <HighlightOffIcon
            sx={{color: 'white'}}
            fontSize='large'
          />
        </IconButton>
      </A2hsStyles> : null}
        </>
      </Box>
    </Router>
  );
};

export default App;

