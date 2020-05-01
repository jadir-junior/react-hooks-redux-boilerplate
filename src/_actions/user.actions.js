import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '../_actions';
import { history } from '../_helpers';
import jwtDecode from 'jwt-decode';

export const userActions = {
  login,
  register,
  logout,
  getUser,
};

function getUser() {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = jwtDecode(token);

    dispatch({ type: userConstants.GET_USER, user });
  };
}

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
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(token) {
    return { type: userConstants.LOGIN_SUCCESS, token };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
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
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: userConstants.REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
  function login(token) {
    return { type: userConstants.LOGIN_SUCCESS, token };
  }
}

function logout() {
  return (dispatch) => {
    userService.logout();
    dispatch(logout());
    history.push('/login');

    function logout() {
      return { type: userConstants.LOGOUT };
    }
  };
}
