import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import { RegisterPage } from './_containers/RegisterPage';
import { HomePage } from './_containers/HomePage';
import { LoginPage } from './_containers/LoginPage';

import { PrivateRoute, AuthorizationRoute } from './_components';
import NotificationAlert from './_components/NotificationAlert';

import { history } from './_helpers';

import { alertActions } from './_actions';
import Navbar from './_components/Navbar';

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      {localStorage.getItem('token') && <Navbar />}
      {alert.message && (
        // <div className={`alert ${alert.type}`}>{alert.message}</div>
        <NotificationAlert message={alert.message} severity={alert.type} />
      )}
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <AuthorizationRoute path="/login" component={LoginPage} />
          <AuthorizationRoute path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
