import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import ReactDom from 'react-dom';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { VerificationStatus, SkillLevel } from 'redux/action-types/skill';
import Component from '../AddUserSkill';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const skillState = {
  skill: {
    skill: 'php',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString()
  },
  _id: 'id',
  level: SkillLevel.Beginner,
  verificationStatus: VerificationStatus.Unverified,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString()
};

const initialState = {
  skills: {
    userSkill: [skillState],
    skills: [skillState.skill, skillState.skill],
    loading: false,
    userSkillAction: false,
    loadingBtn: false,
    errors: {
      error: 'token',
      message: 'message'
    }
  }
};

const props = {
  initialValue: {
    skillName: 'skillName',
    skill: '',
    level: ''
  },
  close: jest.fn(),
  buttonName: 'save',
  heading: 'Add Skill',
  submit: jest.fn()
};

describe('AddUserSkill', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <Component {...props} />
        </Router>
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <Component {...props} />
        </Router>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('Not Found', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, userSkillAction: false, skills: [] }
      });
    });

    it('return not found message', () => {
      const tree = render(
        <Provider store={store}>
          <Router>
            <Component {...props} />
          </Router>
        </Provider>
      );

      expect(tree).toBeTruthy();
    });
  });

  describe('set user skillAction', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, userSkillAction: true }
      });
    });

    it('set userSkillAction to true', () => {
      const tree = render(
        <Provider store={store}>
          <Router>
            <Component {...props} />
          </Router>
        </Provider>
      );

      expect(tree).toBeTruthy();
    });
  });
});
