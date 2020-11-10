import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { UserDashboard } from '..';
import { initialState } from '../__mock__';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('User Dashboard', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <UserDashboard />
        </Router>
      </Provider>,
      div
    );
  });

  it('should create a snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <UserDashboard />
          </Router>
        </Provider>
      )
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
