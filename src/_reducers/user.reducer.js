import { userConstants } from '../_constants';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_USER:
      return action.user;
    default:
      return state;
  }
}
