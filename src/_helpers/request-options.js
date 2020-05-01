import { authHeader } from './auth-headers';

export function requestOptions(method, body) {
  const options = {
    method: method,
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
}
