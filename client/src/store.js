import { compose, createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const configureStore = (initialState = Map({})) => {
  const middleware = [
    applyMiddleware(thunk),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
  ];

  const store = createStore(
    rootReducer,
    compose(...middleware)
  );
  
  return store;
};

export default configureStore;