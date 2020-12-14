import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Component from '../Employment';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { VerificationStatus } from 'redux/action-types/education';
import { UserRole } from 'redux/action-types/user';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const employmentState = {
  _id: '_id',
  companyName: 'companyName',
  supervisor: {
      name: 'Employee',
      detail: {name: 'grma', email: 'email@gmail.com', phoneNumber: '0786601003'}
  },
  skillsUsed: [],
  responsibilities: [],
  accomplishments: [],
  startDate: '2020-10-10',
  endDate: '2020-12-12',
  isCurrentPosition: false,
  title: 'Software Engineer',
  favoriteProject: '',
  verificationStatus: VerificationStatus.Unverified
};

const initialState = {
  employments: {
    employments: [employmentState],
    loading: false,
    employment: employmentState,
  },
  users: {
    loading: false,
    user: {
      id: 'id',
      username: 'username',
      email: 'email@gmail.com',
      employmentHistory: [employmentState],
      educationHistory: [],
      isVerified: true,
      roles: [UserRole.Talent],
      signupMode: 'Local'
    },
    userSkill: []
  },
  messages: {
    message: 'message',
    error: 'error'
  }
};

describe('Education', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('Should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Component />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should add employment', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const button: Element | any = container.querySelector('.addEmployment');

    fireEvent.click(button);

    expect(button).toBeTruthy();
  });

  it('should set action to true when mouseover event triggered', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const li: Element | any = container.querySelector('.action');

    fireEvent.mouseOver(li);

    expect(li).toBeTruthy();
  });

  it('should set action to false when mouseleave event trigger', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );
    

    const li: Element | any = container.querySelector('.action');

    fireEvent.mouseLeave(li);

    expect(li).toBeTruthy();
  });

  it('should edit employment', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const li: Element | any = container.querySelector('.action');

    fireEvent.mouseOver(li);

    const button: Element | any = container.querySelector('.editEmployment');

    fireEvent.click(button);

    expect(button).toBeTruthy();
  });

  it('should delete employment', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const li: Element | any = container.querySelector('.action');

    fireEvent.mouseOver(li);

    const button: Element | any = container.querySelector('.delete');

    fireEvent.click(button);

    expect(button).toBeTruthy();
  });

  describe('Loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        employments: { ...initialState.employments, loading: true }
      });
    });
    it('should return loading component', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <Component />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector('.sideLoading');

      expect(div).toBeDefined();
    });
  });

  describe('NotFound', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        employments: { ...initialState.employments, employments: [] }
      });
    });
    it('should return not found message', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <Component />
          </Router>
        </Provider>
      );

      const h5: Element | any = container.querySelector('.notFound h5');

      expect(h5).toHaveTextContent('You currently do not have employment history');
    });
  });
});
