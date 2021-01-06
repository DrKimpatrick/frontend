import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SWRConfig } from 'swr';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { fetcher } from 'utils/axiosInstance';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './assets/styles/main.css';
import './assets/styles/cust-material.scss';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK || '');

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <Elements stripe={stripePromise}>
          <SWRConfig
            value={{
              fetcher
            }}
          >
            <App />
          </SWRConfig>
        </Elements>
      </DndProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
