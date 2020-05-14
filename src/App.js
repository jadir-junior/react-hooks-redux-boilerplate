import React from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from 'react-router-dom';

import { Routes } from './Routes';

import NotificationAlert from './_components/NotificationAlert';
import Navbar from './_components/Navbar';

import { history } from './_helpers';

function App() {
  const alert = useSelector((state) => state.alert);
  const authentication = useSelector((state) => state.authentication);

  return (
    <React.Fragment>
      <CssBaseline />
      <Router history={history}>
        {authentication.loggedIn && <Navbar />}
        {alert.message && (
          <NotificationAlert message={alert.message} severity={alert.type} />
        )}
        <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
