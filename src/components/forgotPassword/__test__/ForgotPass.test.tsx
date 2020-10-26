import React, { FC, Dispatch } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import ForgotPass from '../ForgotPass';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import initialState from 'redux/initialState';
import { GetStartedAction } from 'redux/actions/getStarted';
import reducer from 'redux/reducers/users';


let container: any;
let stepsProps: any;
let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  const mockServiceCreator = (body: any, succeeds = true) => () =>
    new Promise((resolve, reject) => {
      setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
    });

  it('renders without crashing', () => {
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <ForgotPass />
        </Router>
      </Provider>,
      container
    );
  });

});
