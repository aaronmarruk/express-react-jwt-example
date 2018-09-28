// import fetch from 'cross-fetch'

export const demoAction = () => ({
  type: 'DEMO_ACTION',
  payload: 'result_of_demo_action'
})

export const getDemoJSONSuccess = (payload) => ({
  type: 'GET_DEMO_JSON_SUCCESS',
  payload,
})

export const getDemoJSONFetch = () => ({
  type: 'GET_DEMO_JSON_FETCH',
})


var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

export function getDemoJSON() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.​
    dispatch(getDemoJSONFetch())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.​
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.


    return fetch('api/v1/demo/', {
      headers: myHeaders,
    })
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then((json) => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        console.log('THE RETURHNED JSON', json)

        return dispatch(getDemoJSONSuccess(json))

      })
  }
}