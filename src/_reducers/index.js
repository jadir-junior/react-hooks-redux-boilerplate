import { combineReducers } from 'redux';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { user } from './user.reducer';

const rootReducer = combineReducers({
  registration,
  alert,
  authentication,
  user,
});

export default rootReducer;
