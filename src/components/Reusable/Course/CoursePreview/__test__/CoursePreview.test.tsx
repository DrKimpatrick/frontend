import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../CoursePreview';
import { cleanup, render } from '@testing-library/react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { UserRole } from 'redux/action-types/user';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  courses: {
    courseDetailLoading: false,
    courseDetail: {
      currentLangSpecsUpdated: false,
      verificationStatus: 'pending',
      description: 'desc',
      _id: 'id',
      name: 'React Crash Course',
      instructor: 'Ryan Dahl',
      languageTaught: 'English',
      existingCourseLink: 'link',
      coverImageLink: 'link',
      level: 'advanced',
      duration: '5 Hr',
      userId: {
        _id: 'id',
        username: 'id',
        email: 'email'
      },
      createdAt: 'date',
      updatedAt: 'date'
    },
    errors: {}
  },
  users: {
    user: {
      _id: 'id',
      username: 'username',
      roles: [UserRole.SuperAdmin]
    }
  }
};

const props = {
  courseId: 'id',
  closeModal: jest.fn()
};

describe('CoursePreview', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('Loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        courses: { ...initialState.courses, courseDetailLoading: true }
      });
    });

    it('should return loading', () => {
      const { container } = render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );

      const loading = container.querySelector('.sideLoading');

      expect(loading).toBeDefined();
    });
  });
});
