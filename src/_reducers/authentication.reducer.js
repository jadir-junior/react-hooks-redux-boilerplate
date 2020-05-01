import { authenticationConstanst } from '../_constants';

let token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? { loggedIn: true, token } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstanst.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authenticationConstanst.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token,
      };
    case authenticationConstanst.LOGIN_FAILURE:
      return {};
    case authenticationConstanst.LOGOUT:
      return {};
    default:
      return state;
  }
}
