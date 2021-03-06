import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cleanup, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import ReactDom from 'react-dom';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { VerificationStatus, SkillLevel } from 'redux/action-types/skill';
import UserSkill from '../UserSkill';

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
    userSkill: [
      {
        ...skillState,
        level: SkillLevel.Advanced,
        verificationStatus: VerificationStatus.Unverified
      },
      {
        ...skillState,
        level: SkillLevel.Intermediate,
        verificationStatus: VerificationStatus.Unverified
      },
      {
        ...skillState,
        verificationStatus: VerificationStatus.Unverified
      }
    ],
    skills: [skillState.skill],
    loading: false,
    userSkillAction: false,
    loadingBtn: false,
    errors: {
      error: 'token',
      message: 'message'
    }
  }
};

describe('User Skill', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <UserSkill />
        </Router>
      </Provider>,
      div
    );
  });
  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <UserSkill />
        </Router>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
  
  describe('Loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, loading: true }
      });
    });

    it('return SplashScreen component', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <UserSkill />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector('.sideLoading');

      expect(div).toBeDefined();
    });
  });

  describe('Not Found', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, userSkill: [] }
      });
    });

    it('return not found message when there is empty array', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <UserSkill />
          </Router>
        </Provider>
      );

      const h5: Element | any = container.querySelector('.notFound h5');

      expect(h5).toHaveTextContent('You do not have skills');
    });
  });

  describe('Empty Fragment', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        skills: { ...initialState.skills, userSkill: undefined }
      });
    });

    it('return empty when there is no user skills', () => {
      render(
        <Provider store={store}>
          <Router>
            <UserSkill />
          </Router>
        </Provider>
      );
    });
  });
});
