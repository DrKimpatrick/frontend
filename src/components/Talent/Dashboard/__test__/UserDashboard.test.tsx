import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Dashboard } from '..';
import { initialState } from '../__mock__';
import { TalentProcess } from 'redux/action-types/user';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('User Dashboard', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>,
      div
    );
  });

  it('should create a snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Dashboard />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Profile Process', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.AddEducation
          }
        }
      });
    });

    it('should redirect user back', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Dashboard />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });
});
