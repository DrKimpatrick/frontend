import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Component from '../SkillSet';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { cleanup, render } from '@testing-library/react';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const userSkill = {
  skill: {
    _id: '5fb8cebd750b0131d5a18cc2',
    skill: 'Typescript',
    createdAt: '2020-11-21T08:24:29.802Z',
    updatedAt: '2020-11-21T08:24:29.802Z'
  },
  level: 'advanced',
  verificationStatus: 'unverified',
  _id: '5fb8d5cb750b0131d5a18cd0',
  createdAt: '2020-11-21T08:54:35.322Z',
  updatedAt: '2020-11-21T08:54:35.322Z'
};

const initialState = {
  users: {
    userSkillLoading: false,
    userSkill: [
      { ...userSkill },
      { ...userSkill, level: 'beginner' },
      { ...userSkill, level: 'intermediate' }
    ]
  }
};

const props = {
  userId: 'id'
};

describe('SkillSet', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('Advanced skill', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userSkill: [
            { ...userSkill, level: 'beginner' },
            { ...userSkill, level: 'intermediate' }
          ]
        }
      });
    });
    it('should return message when advanced skill not found', () => {
      const { container } = render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );

      const message = container.querySelector('.notFound h5');

      expect(message).toHaveTextContent('There are no advanced skills');
    });
  });

  describe('Intermediate skill', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userSkill: [
            { ...userSkill, level: 'beginner' },
            { ...userSkill, level: 'advanced' }
          ]
        }
      });
    });
    it('should return message when intermediate skill not found', () => {
      const { container } = render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );

      const message = container.querySelector('.notFound h5');

      expect(message).toHaveTextContent('There are no intermediate skills');
    });
  });

  describe('Beginner skill', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userSkill: [
            { ...userSkill, level: 'intermediate' },
            { ...userSkill, level: 'advanced' }
          ]
        }
      });
    });
    it('should return message when beginners skill not found', () => {
      const { container } = render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );

      const message = container.querySelector('.notFound h5');

      expect(message).toHaveTextContent('There are no beginner skills');
    });
  });

  describe('loading spinner', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, userSkillLoading: true }
      });
    });

    it('should return loading spinner', () => {
      const { container } = render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );

      const loading = container.querySelector('.sideLoading');

      expect(loading).toBeDefined();
    });
  });
});
