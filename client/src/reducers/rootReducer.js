import { combineReducers } from 'redux-immutable';
import demoReducer from './demoReducer';
import userReducer from './userReducer';

export default combineReducers({
  demoReducer,
  userReducer,
});