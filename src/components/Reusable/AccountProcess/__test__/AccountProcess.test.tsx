import React from 'react';
import Component from '../AccountProcess';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { TalentProcess } from 'redux/action-types/user';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    user: {
      _id: 'id',
      username: 'username',
      email: 'email',
      roles: ['talent'],
      updatedAt: '2020-10-10',
      dateRegistered: '2020-10-10',
      paymentStatus: 'verified',
      featureChoice: 'local',
      verified: true,
      profileProcess: TalentProcess.Completed
    },
    currentUser: {
      isLoggedIn: true,
      loading: false,
      error: null,
      message: null,
      created: false,
      data: {
        firstName: 'John',
        lastName: 'Smith',
        profilePicture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      }
    },
    loading: false
  }
};

describe('Account Process', () => {
  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>,
      div
    );
  });

  it('it should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Component />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('should return splashScreen', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          loading: true,
          user: { ...initialState.users.user, roles: [] }
        }
      });
    });
    it('it should return splashScreen when loading is true', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });
});
