import React from 'react';
import { AdminLayout } from '..';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { UserRole } from 'redux/action-types/user';
import { cleanup, render } from '@testing-library/react';

let store: Store;

let middleware = [thunk];

const mockStore = configureMockStore(middleware);

const mockGoBack = jest.fn();

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
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockGoBack
  })
}));

describe('AdminLayout', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);
  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <AdminLayout />
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
            <AdminLayout />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('return splashScreen', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          loading: true
        }
      });
    });

    it('should return splashScreen', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <AdminLayout />
          </Router>
        </Provider>
      );

      const h5 = container.querySelector('.splashScreen .loading h5');

      expect(h5).toHaveTextContent('Loading');
    });
  });

  describe('redirect back', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: { ...initialState.users.user, roles: [UserRole.Talent] }
        }
      });
    });

    it('should redirect user to the previous route', () => {
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminLayout />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(mockGoBack).toBeCalled();
    });
  });
});
