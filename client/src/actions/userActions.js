export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

// LOGIN_SUCCESS
// LOGIN_FAILURE

// loginAction
function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

// loginSuccess
function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  }
}

// loginFailure
function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// loginFailure
function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
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

export function loginUser(credentials) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${credentials.username}&password=${credentials.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(credentials))

    return fetch('api/v1/auth/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));

          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', user.token);

          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function signUpUser(credentials) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${credentials.username}&password=${credentials.password}`,
  }

  const url = 'api/v1/user';

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignUp(credentials))

    return fetch(url, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          console.log('THESE ARE AVAILABLE IN HERE', user, response);
          dispatch(signUpError(user.error || user.message));

          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          // localStorage.setItem('id_token', user.id_token);
          // localStorage.setItem('id_token', user.access_token);
          // Dispatch the success action
          const credentials = {
            username: user.email,
            password: user.password,
          };
          dispatch(receiveSignUp(user))
          dispatch(loginUser(credentials))
        }
      }).catch(err => console.log("Error: ", err))
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
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}


// thunk

