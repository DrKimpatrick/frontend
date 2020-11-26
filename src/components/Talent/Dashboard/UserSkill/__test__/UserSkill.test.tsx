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

      const h5: Element | any = container.querySelector(
        '.splashScreen .loading h5'
      );

      expect(h5).toHaveTextContent('Loading');
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

  describe('Beginner Skills', () => {
    beforeEach(() => {
      const beginner = {
        ...initialState.skills.userSkill[0],
        level: SkillLevel.Advanced
      };
      store = mockStore({
        ...initialState,
        skills: {
          ...initialState.skills,
          userSkill: [
            beginner,
            initialState.skills.userSkill[1],
            initialState.skills.userSkill[2]
          ]
        }
      });
    });

    it('return empty when there is no beginner skills', () => {
      const { container } = render(
        <Provider store={store}>
          <UserSkill />
        </Provider>
      );

      const h5: Element | any = container.querySelector('.notFound h5');

      expect(h5).toHaveTextContent('There are no beginner skills');
    });
  });

  describe('Intermediate Skills', () => {
    beforeEach(() => {
      const intermediate = {
        ...initialState.skills.userSkill[2],
        level: SkillLevel.Advanced
      };
      store = mockStore({
        ...initialState,
        skills: {
          ...initialState.skills,
          userSkill: [
            initialState.skills.userSkill[0],
            initialState.skills.userSkill[1],
            intermediate
          ]
        }
      });
    });

    it('return empty when there is no intermediate skills', () => {
      const { container } = render(
        <Provider store={store}>
          <UserSkill />
        </Provider>
      );

      const h5: Element | any = container.querySelector('.notFound h5');

      expect(h5).toHaveTextContent('There are no intermediate skills');
    });
  });

  describe('Advanced Skills', () => {
    beforeEach(() => {
      const advanced = {
        ...initialState.skills.userSkill[1],
        level: SkillLevel.Beginner
      };
      store = mockStore({
        ...initialState,
        skills: {
          ...initialState.skills,
          userSkill: [
            initialState.skills.userSkill[0],
            advanced,
            initialState.skills.userSkill[2]
          ]
        }
      });
    });

    it('return empty when there is no advanced skills', () => {
      render(
        <Provider store={store}>
          <UserSkill />
        </Provider>
      );
    });
  });
});
