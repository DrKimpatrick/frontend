import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RecentEmployer from '../RecentEmployer';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import initialState from 'redux/initialState';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('`RecentEmployer` component', () => {

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <RecentEmployer />
        </Router>
      </Provider>,
      div
    );
  });

});
