import { Map } from 'immutable';

const initialState = Map({})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DEMO_ACTION':
      return state.set('result', action.payload);
    case 'GET_DEMO_JSON_FETCH':
      return state.set('isFetching', true);
    case 'GET_DEMO_JSON_SUCCESS':
      return state
        .set('demoJSON', action.payload)
        .set('isFetching', false);
    default:
      return state
    }
}