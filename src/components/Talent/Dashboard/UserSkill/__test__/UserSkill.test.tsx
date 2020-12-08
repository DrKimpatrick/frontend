import React from 'react';
import { Provider } from 'react-redux';
import { cleanup, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ReactDom from 'react-dom';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { VerificationStatus, SkillLevel } from 'redux/action-types/skill';
import UserSkill from '../UserSkill';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  skills: {
    userSkill: [
      {
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
      },
      {
        skill: {
          skill: 'typescript',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        _id: 'id',
        level: SkillLevel.Advanced,
        verificationStatus: VerificationStatus.Unverified,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
      {
        skill: {
          skill: 'typescript',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        _id: 'id',
        level: SkillLevel.Intermediate,
        verificationStatus: VerificationStatus.Unverified,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      }
    ],
    loading: false
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
        <UserSkill />
      </Provider>,
      div
    );
  });
  it('should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <UserSkill />
        </Provider>
      )
      .toJSON();

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
          <UserSkill />
        </Provider>
      );

      const div: Element | any = container.querySelector(
        '.sideLoading'
      );

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
          <UserSkill />
        </Provider>
      );

      const h5: Element | any = container.querySelector('.notFound h5');

      expect(h5).toHaveTextContent('There are no skills');
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
          <UserSkill />
        </Provider>
      );
    });
  });

});
