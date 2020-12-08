import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import AddCompany from '../AddCompany';
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
  },
  companies: {
    errors: null,
    loading: false
  },
};

describe('Add company', () => {
  beforeEach(() => {
    store = mockStore(initialState)
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <AddCompany/>
        </Router>
      </Provider>,
      div
    )
  });

  it('it should contain the form component', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AddCompany />
        </Router>
      </Provider>
    );
    const form: Element | null = container.querySelector('.form-company-school');
    
    expect(form).toBeTruthy();
  });

  it('it should contain the form title component', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AddCompany />
        </Router>
      </Provider>
    );
    const formTitle: Element | null = container.querySelector('.form-title');
    
    expect(formTitle).toBeTruthy();
  });
});
