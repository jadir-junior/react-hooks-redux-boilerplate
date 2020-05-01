import { userService } from '../_services';
import { alertActions } from '../_actions';
import { history } from '../_helpers';
import { authenticationConstanst } from '../_constants';

export const authenticationActions = {
  login,
  register,
  logout,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request());

    userService.login(email, password).then(
      (response) => {
        dispatch(success(response.token));
        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: authenticationConstanst.LOGIN_REQUEST };
  }
  function success(token) {
    return { type: authenticationConstanst.LOGIN_SUCCESS, token };
  }
  function failure(error) {
    return { type: authenticationConstanst.LOGIN_FAILURE, error };
  }
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (response) => {
        dispatch(success());
        dispatch(login(response.token));
        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: authenticationConstanst.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: authenticationConstanst.REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: authenticationConstanst.REGISTER_FAILURE, error };
  }
  function login(token) {
    return { type: authenticationConstanst.LOGIN_SUCCESS, token };
  }
}

function logout() {
  return (dispatch) => {
    userService.logout();
    dispatch(logout());
    history.push('/login');

    function logout() {
      return { type: authenticationConstanst.LOGOUT };
    }
  };
}
