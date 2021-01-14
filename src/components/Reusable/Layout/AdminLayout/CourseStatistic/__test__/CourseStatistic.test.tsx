import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Component from '../CourseStatistic';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  courses: {
    numberOfPendingCourse: 4,
    numberOfAcceptedCourse: 4,
    numberOfDeclinedCourse: 5
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/path'
  })
}));
describe('Course Statistic', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Router>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Router>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>
    );

    expect(tree).toMatchSnapshot();
  });
});
