import { authenticationConstanst } from '../_constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case authenticationConstanst.REGISTER_REQUEST:
      return { registering: true };
    case authenticationConstanst.REGISTER_SUCCESS:
      return {};
    case authenticationConstanst.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
