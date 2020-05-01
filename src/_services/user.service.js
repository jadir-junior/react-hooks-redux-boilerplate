import config from '../_config';
import { requestOptions, handleResponse } from '../_helpers';

export const userService = {
  login,
  register,
  logout,
};

function login(email, password) {
  return fetch(
    `${config.apiUrl}/login`,
    requestOptions('POST', { email, password })
  )
    .then(handleResponse)
    .then((token) => {
      localStorage.setItem('token', JSON.stringify(token.token));

      return token;
    });
}

function register(user) {
  return fetch(`${config.apiUrl}/register`, requestOptions('POST', user))
    .then(handleResponse)
    .then((token) => {
      localStorage.setItem('token', JSON.stringify(token.token));

      return token;
    });
}

function logout() {
  localStorage.removeItem('token');
}
