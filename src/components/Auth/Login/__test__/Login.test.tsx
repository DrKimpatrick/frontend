import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import initialState from 'redux/initialState';
import { LoginAction } from 'redux/actions/login';
import { LOGIN_FAIL, LOGIN_SUCCESS } from 'redux/action-types/login';
import reducer from 'redux/reducers/users';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';

let container: any;
let stepsProps: any;
let store: any;

const mockStore = configureMockStore([thunk]);

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
      container
    );
  });

  it('fires a login request action', () => {
    const actionDisp = store.dispatch(
      LoginAction({
        password: 'pass',
        email: 'tes@gmail.com'
      })
    );

    expect(actionDisp.payload.url).toEqual('/auth/login');
    expect(actionDisp.payload.data).toEqual({
      password: 'pass',
      email: 'tes@gmail.com'
    });
  });

  it('should handle LOGIN', () => {
    const user = {
      username: 'username',
      email: 'email@gmail.com',
      password: 'passP12!@'
    };

    const expected = {
      currentUser: user,
      loading: false
    };

    expect(
      reducer(undefined, {
        type: LOGIN_SUCCESS,
        payload: user
      })
    ).toEqual(expected);
  });

  it('should handle REGISTER_FAIL', () => {
    const user = {
      email: 'email@gmail.com',
      password: 'passP12!@'
    };

    const expected = {
      currentUser: user
    };

    expect(
      reducer(undefined, {
        type: LOGIN_FAIL,
        payload: 'failed to login'
      })
    ).toEqual({
      ...initialState.users,
      errorLogin: 'failed to login',
      loading: false
    });
  });
});
