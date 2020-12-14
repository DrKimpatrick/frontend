import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Component from '../Education';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { VerificationStatus } from 'redux/action-types/education';
import { UserRole } from 'redux/action-types/user';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const educationState = {
  _id: '_id',
  accomplishments: ['IT'],
  level: 'university',
  name: 'nungamo',
  degree: 'A2',
  startDate: '2020-10-10',
  endDate: '2020-12-12',
  specializations: ['IT'],
  isCurrentEducation: false,
  verificationStatus: VerificationStatus.Unverified
};

const initialState = {
  educations: {
    educations: [educationState],
    loading: false,
    education: educationState
  },
  users: {
    loading: false,
    user: {
      id: 'id',
      username: 'username',
      email: 'email@gmail.com',
      employmentHistory: [],
      educationHistory: [educationState],
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

  it('should add education', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const button: Element | any = container.querySelector('.addEducation');

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

  it('should edit education', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );

    const li: Element | any = container.querySelector('.action');

    fireEvent.mouseOver(li);

    const button: Element | any = container.querySelector('.editEducation');

    fireEvent.click(button);

    expect(button).toBeTruthy();
  });

  it('should delete education', () => {
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
        educations: { ...initialState.educations, loading: true }
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
        educations: { ...initialState.educations, educations: [] }
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

      expect(h5).toHaveTextContent('You do not have education history');
    });
  });
});
