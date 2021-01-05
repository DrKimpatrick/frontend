import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import Component from '../AdminProfile';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import { UserRole } from 'redux/action-types/user';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    user: {
      username: 'username',
      roles: [UserRole.HrAdmin],
      email: 'email@gmail.com',
      _id: 'id',
      employmentHistory: [],
      educationHistory: [],
      courses: [],
      bio: 'bio'
    },
    loading: false
  }
};

describe('Admin Profile', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Component/>
        </Router>
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <Component/>
        </Router>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});