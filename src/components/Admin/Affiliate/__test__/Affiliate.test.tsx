import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import Affiliate from '../Affiliate';
import configureMockStore from 'redux-mock-store';
import { cleanup } from '@testing-library/react';

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
    }
  },
  courses: {
    acceptedCourse: {
      courses: [
        {
          name: 'name',
          _id: 'id',
          coverImageLink: 'coverImageLink',
          userId: {
            username: 'username'
          }
        }
      ],
      totalItems: 0
    },
    pendingCourse: {
      courses: [
        {
          name: 'name',
          _id: 'id',
          coverImageLink: 'coverImageLink',
          userId: {
            username: 'username'
          }
        }
      ],
      totalItems: 0
    },
    declinedCourse: {
      courses: [
        {
          name: 'name',
          _id: 'id',
          coverImageLink: 'coverImageLink',
          userId: {
            username: 'username'
          }
        }
      ],
      totalItems: 0
    },
    loading: false
  }
};

describe('Admin Affiliate', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Affiliate />
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
            <Affiliate />
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
        courses: { ...initialState.courses, loading: true }
      });
    });
    it('it should return splashScreen when loading is true', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Affiliate />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });
});
