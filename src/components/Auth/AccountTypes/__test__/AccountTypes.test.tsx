import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import AccountTypes from '../AccountTypes'
import configureMockStore from 'redux-mock-store';
import { cleanup, render, fireEvent } from '@testing-library/react';

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
    signupMode: "LOCAL",
    roles: [],
    verified: true,
    featureChoice: "basic",
    paymentStatus: "unpaid",
    employmentHistory: null,
    educationHistory: null,
    courses: [],
    _id: "5fae9535afabaabde7cd66c6",
    username: "username",
    email: "email@gmail.com",
    dateRegistered: "2020-11-13T14:16:21.528Z",
    updatedAt: "2020-11-25T08:45:47.981Z",
  },
  errors: null,
  loading: false
  }
};

describe('Account Types', () => {
  beforeEach(() => {
    store = mockStore(initialState)
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <AccountTypes/>
        </Router>
      </Provider>,
      div
    )
  });

  it('it should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AccountTypes />
          </Router>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('it should not show next button if an account not selected', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AccountTypes />
        </Router>
      </Provider>
    );

    const nextBtn: Element | null = container.querySelector('.next-btn')

    expect(nextBtn).toBeNull();
  })

  it('it should show next button if an account is selected', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AccountTypes />
        </Router>
      </Provider>
    );

    const accountType: Element | null = container.querySelectorAll('.account-types-item')[0];

    fireEvent.click(accountType);

    const nextBtn: Element | null = container.querySelector('.next-btn')

    expect(nextBtn).toBeTruthy();
  });
});
