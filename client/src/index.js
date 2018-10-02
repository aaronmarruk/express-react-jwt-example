import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
