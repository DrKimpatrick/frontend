import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import GetStated from '../CreateAccount';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import { GetStartedAction } from 'redux/actions/getStarted';
import { userReducer as reducer } from 'redux/reducers/users';
import { REGISTER_FAIL, REGISTER_SUCCESS } from 'redux/action-types/getStarted';

let container: any;

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

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
          <GetStated />
        </Router>
      </Provider>,
      container
    );
  });

  it('fires a register request action', () => {
    const actionDisp = GetStartedAction({
      username: 'user',
      password: 'pass',
      email: 'tes@gmail.com'
    })(store.dispatch);

    expect(actionDisp.payload.url).toEqual('/auth/register');
    expect(actionDisp.payload.data).toEqual({
      username: 'user',
      password: 'pass',
      email: 'tes@gmail.com'
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    const user = {
      username: 'username',
      email: 'email@gmail.com',
      password: 'passP12!@'
    };

    const expected = {
      currentUser: {
        data: {
          email: 'email@gmail.com',
          password: 'passP12!@',
          username: 'username'
        },
        created: true,
        isLoggedIn: false,
        error: null
      },
      loading: false
    };

    expect(
      reducer(undefined, {
        type: REGISTER_SUCCESS,
        payload: user
      })
    ).toEqual(expected);
  });

  it('should handle REGISTER_FAIL', () => {
    const send = reducer(undefined, {
      type: REGISTER_FAIL,
      payload: 'failed to register'
    });

    expect(typeof send).toBe('object');
    expect(send.currentUser.data).toMatchObject(
      initialState.users.currentUser.data
    );
  });
});
