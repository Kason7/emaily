import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // Provider is what dynamically render changes child DOM elements
import { createStore, applyMiddleware } from 'redux';

// Import components
import App from './components/App';

// Import reducers
import reducers from './reducers';

// Configuring store (Data store)
const store = createStore(reducers, {}, applyMiddleware());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
