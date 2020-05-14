import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RegisterPage } from './_containers/RegisterPage';
import { HomePage } from './_containers/HomePage';
import { LoginPage } from './_containers/LoginPage';
import { ProfilePage } from './_containers/ProfilePage';

import { PrivateRoute, AuthorizationRoute } from './_components';

function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <AuthorizationRoute path="/login" component={LoginPage} />
      <AuthorizationRoute path="/register" component={RegisterPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export { Routes };
