import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import PendingCourse from '../PendingCourse';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';

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
    loading: false
  }
};

describe('Pending Course', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <PendingCourse />
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
            <PendingCourse />
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

    it('should return splashScreen when loading is true', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <PendingCourse />
          </Router>
        </Provider>
      );

      const h5: Element | any = container.querySelector('.loading h5');

      expect(h5).toHaveTextContent('Loading');
    });
  });
});
