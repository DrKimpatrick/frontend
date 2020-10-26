import React, { FC, Dispatch } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import GetStated from '../GetStarted';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import initialState from 'redux/initialState';
import { GetStartedAction } from 'redux/actions/getStarted';
import reducer from 'redux/reducers/users';
import {
  Register,
  RegisterDispatchTypes,
  REGISTER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from 'redux/action-types/getStarted';


let container: any;
let stepsProps: any;
let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  const mockServiceCreator = (body: any, succeeds = true) => () =>
    new Promise((resolve, reject) => {
      setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
    });

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
    const actionDisp = store.dispatch(
      GetStartedAction({
        username: 'user',
        password: 'pass',
        email: 'tes@gmail.com'
      })
    );

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
          username: 'username',
        },
        created: true,
        isLoggedIn: false,
        error: null
      },
      loading:false
    };

    expect(
      reducer(undefined, {
        type: REGISTER_SUCCESS,
        payload: user
      })
    ).toEqual(expected);
  });


  it('should handle REGISTER_FAIL', () => {
  
    const user = {
      username: 'username',
      email: 'email@gmail.com',
      password: 'passP12!@'
    };

    const expected = {
      currentUser: user
    };

    expect(
      reducer(undefined, {
        type: REGISTER_FAIL,
        payload: 'failed to register'
      })
    ).toEqual({
      ...initialState.users,
      created: true,
      errorSignup: 'failed to register',
      loading: false
    });
  });
  
});
