export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
    id_token: user.id_token
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

export function loginUser(credentials) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
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
          localStorage.setItem('id_token', user.id_token);
          localStorage.setItem('id_token', user.access_token);
          // Dispatch the success action
          dispatch(receiveLogin(user))
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

