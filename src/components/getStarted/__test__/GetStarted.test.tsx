import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import GetStated from '../GetStarted';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import initialState from 'redux/initialState';

let container: any;
let stepsProps: any;
let store: any;

const mockStore = configureMockStore([thunk]);

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore(initialState);

  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <GetStated />
        </Router>
      </Provider>,
      container
    );
  });


});