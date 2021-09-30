import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import DashboardComponent from './components/Dashboard/DashboardComponent';
import {currentUserVar} from './cache';
import resolvers from './resolvers';

import SnackbarStack from './helpers/snackbar';
import Profile from './components/Profile/Profile';

import {DrawerContainer} from './components/Drawer/DrawerContainer';

const App = () => {
  const checkIfUserIsLoggedIn = () => {
    const {error, loading, data} = useQuery(
        resolvers.queries.ReturnUser);
    if (!error && !loading && data.returnUser) {
      setTimeout(() => {
        currentUserVar({
          ...data.returnUser,
          isLoggedIn: true,
        });
      }, 0);
    }
  };

  checkIfUserIsLoggedIn();

  return (
    <React.Fragment>
      <Router>
        <DrawerContainer />
        <Switch>
          <Route exact path='/'>
            <DashboardComponent />
          </Route>
          <Route path='/profile/:id'>
            <Profile />
          </Route>
        </Switch>
        <SnackbarStack />
      </Router>
    </React.Fragment>
  );
};

export default App;

