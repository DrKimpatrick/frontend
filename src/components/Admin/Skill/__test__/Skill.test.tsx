import React from 'react';
import Component from '../Skill';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { UserRole } from 'redux/action-types/user';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
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
    user: {
      username: 'username',
      roles: [UserRole.SuperAdmin],
      email: 'email@gmail.com',
      _id: 'id',
      employmentHistory: [],
      educationHistory: [],
      courses: []
    },
    loading: false
  },
  skills: {
    loading: false,
    action: false,
    skills: [
      {
        skill: 'test skill',
        _id: '_id'
      }
    ],
    errors: 'something wrong'
  }
};

describe('Skill Component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

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

  it('should create snapshot', () => {
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

  describe('Loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, loading: true }
      });
    });

    it('return side loading component', () => {
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
