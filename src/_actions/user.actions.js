import { userConstants } from '../_constants';

import jwtDecode from 'jwt-decode';

export const userActions = {
  getUser,
};

function getUser() {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = jwtDecode(token);

    dispatch({ type: userConstants.GET_USER, user });
  };
}
