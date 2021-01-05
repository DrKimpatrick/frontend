import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import Component from '../Code';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import { UserRole } from 'redux/action-types/user';

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
    },
    user: {
      username: 'username',
      roles: [UserRole.RecruitmentAdmin],
      email: 'email@gmail.com',
      _id: 'id',
      employmentHistory: [],
      educationHistory: [],
      courses: []
    },
    loading: false
  },
  hrAdmin: {
    loading: false,
    usedCode: [
      {
        usedBy: [],
        _id: '5ff32e2295d3d59450b37097',
        issuer: {
          signupMode: 'LOCAL',
          roles: [UserRole.RecruitmentAdmin],
          verified: true,
          featureChoice: 'premium',
          paymentStatus: 'confirmed',
          couponUsed: null,
          employmentHistory: [],
          educationHistory: [],
          courses: [],
          companies: ['5ff32df995d3d59450b37096'],
          schools: [],
          stripeSubscriptionId: 'sub_IhJCr2J1lhBrMq',
          _id: '5ff32d5095d3d59450b37095',
          username: 'pacento',
          email: 'pacento@gmail.com',
          dateRegistered: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          __v: 0,
          profileProcess: 'Completed'
        },
        coupon: 'code',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      }
    ]
  }
};

describe('HrAdminCode', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Component/>
        </Router>
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <Component/>
        </Router>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
