export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';


function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestGetUser() {
  return {
    type: GET_USER_REQUEST,
    isFetching: true,
  }
}

function receiveGetUser(user) {
  return {
    type: GET_USER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
  }
}

function requestSignUp(credentials) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function receiveSignUp(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    message: 'You have successfully signed up',
  }
}


function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    token: '',
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    dispatch(receiveLogout())
  }
}

export function loginUser(credentials) {
  return dispatch => {
    dispatch(requestLogin(credentials))
    
    const config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `email=${credentials.username}&password=${credentials.password}`
    }
  
    return fetch('api/v1/auth/login', config)
      .then(response =>
        response.json().then(user => ({ user, response })),
      )
      .then(({ user, response, token }) => {
        if (!response.ok) {
          dispatch(loginError(user.message));

          return Promise.reject(user);
        } else {
          localStorage.setItem('token', user.token);

          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function getUser(credentials) {
  return (dispatch, getState) => {
    const url = 'api/v1/user';
    const token = getState().getIn(['userReducer', 'token']);
    const config = {
      method: 'GET',
      headers: { 
        'Content-Type':'application/x-www-form-urlencoded', 
        'Authorization': `Bearer ${token}`,
      },
    }

    dispatch(requestGetUser())

    return fetch(url, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(signUpError(user.error || user.message));

          return Promise.reject(user);
        } else {
          dispatch(receiveGetUser(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


export function signUpUser(credentials) {
  return dispatch => {
    const config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `email=${credentials.username}&password=${credentials.password}`,
    }
    const url = 'api/v1/user';

    dispatch(requestSignUp(credentials))
    
    return fetch(url, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(signUpError(user.error || user.message));

          return Promise.reject(user);
        } else {
          dispatch(receiveSignUp(user))
          dispatch(loginUser(credentials))
        }
      }).catch(err => console.log("Error: ", err))
  }
}



