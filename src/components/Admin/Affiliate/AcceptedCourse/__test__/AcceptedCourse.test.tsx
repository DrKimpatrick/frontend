import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import AcceptedCourse from '../AcceptedCourse';
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
    loading: false
  }
};

describe('Accepted Course', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <AcceptedCourse />
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
            <AcceptedCourse />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('render splashScreen', () => {
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
              <AcceptedCourse />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('render not found component', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        courses: {
          ...initialState.courses,
          acceptedCourse: {
            ...initialState.courses.acceptedCourse,
            courses: []
          }
        }
      });
    });

    it('should render not found component', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <AcceptedCourse />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector('.message');

      expect(div).toHaveTextContent('No result found');
    });
  });
});
