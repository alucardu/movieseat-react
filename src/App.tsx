import React, {useEffect} from 'react';
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
import {MovieDetails} from 'Components/MovieDetails/MovieDetails';
import {ChangePassword} from 'Components/ChangePassword/ChangePassword';
import {LoginForm} from 'Components/Login/LoginForm';

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
            {currentUser.isLoggedIn ?
              <DashboardComponent />:
              <><RandomBackground /> <LoginForm /></>
            }
          </Route>
          <Route exact path='/suggestions'>
            <MovieSuggestions />
          </Route>
          <Route path='/profile/:id'>
            <Profile />
          </Route>
          <Route path='/movie/:id'>
            <MovieDetails />
          </Route>
          <Route path='/user/change-password/:id'>
            <RandomBackground />
            <ChangePassword />
          </Route>
        </Switch>
        <SnackbarStack />
      </Box>
    </Router>
  );
};

export default App;

