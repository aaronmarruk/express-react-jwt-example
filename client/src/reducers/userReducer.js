import { fromJS } from 'immutable';

import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from '../actions/userActions'

const initialState = fromJS({
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('isFetching', true)
        .set('isAuthenticated', false)
        .set('user', action.creds);
    case LOGIN_SUCCESS:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', true)
        .set('errorMessage', '')
    case LOGIN_FAILURE:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', false)
        .set('errorMessage', action.message);
    case LOGOUT_SUCCESS:
      return state
        .set('isFetching', true)
        .set('isAuthenticated', false)
    case SIGNUP_FAILURE:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', false)
        .set('errorMessage', action.message);
    case SIGNUP_SUCCESS:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', false)
        .set('successMessage', action.message);
    default:
      return state
  }
}