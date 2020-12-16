import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { LoginAction } from 'redux/actions/login';
import { LOGIN_FAIL, LOGIN_SUCCESS } from 'redux/action-types/login';
import { userReducer as reducer } from 'redux/reducers/users';

let container: any;

let store: Store;

const mockStore = configureMockStore([thunk]);

const initialState = {
  users: {
    currentUser: {
      isLoggedIn: localStorage.getItem('token') ? true : false,
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
  }
};

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
    const actionDisp = LoginAction({
      password: 'pass',
      username: 'tes@gmail.com'
    })(store.dispatch);

    expect(actionDisp.payload.url).toEqual('/auth/login');
    expect(actionDisp.payload.data).toEqual({
      password: 'pass',
      username: 'tes@gmail.com'
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
      }).currentUser
    ).toEqual(expected.currentUser);
  });

  it('should handle REGISTER_FAIL', () => {
    const send = reducer(undefined, {
      type: LOGIN_FAIL,
      payload: 'failed to login'
    });

    expect(typeof send).toBe('object');
  });
});
