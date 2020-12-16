import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Landing from '../Landing';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import initialState from 'redux/initialState';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';
import { create, act } from 'react-test-renderer';

let container: any;
let store: any;

const mockStore = configureMockStore([thunk]);

describe('Landing Page Component', () => {
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
          <Landing />
        </Router>
      </Provider>,
      container
    );

    afterEach(cleanup);
  });

  it('should render Texts included on component correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Landing />
        </Router>
      </Provider>
    );
  });
});
