import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
