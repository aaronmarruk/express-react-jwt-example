import { fromJS } from 'immutable';

import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from '../actions/userActions'

const initialState = fromJS({
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: {
    email: '',
    profile: '',
  }
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
        .set('token', action.token)
        .set('errorMessage', '')
    case LOGIN_FAILURE:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', false)
        .set('errorMessage', action.message);
    case LOGOUT_SUCCESS:
      return state
        .set('isFetching', true)
        .set('token', '')
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
    case GET_USER_REQUEST:
      return state
        .set('isFetching', true)
    case GET_USER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('isAuthenticated', true)
        .set('user', action.user)
    default:
      return state
  }
}