import React from 'react';
import Component from '../TalentProcess';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { TalentProcess } from 'redux/action-types/user';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    user: {
      _id: 'id',
      username: 'username',
      email: 'email',
      roles: ['talent'],
      updatedAt: '2020-10-10',
      dateRegistered: '2020-10-10',
      paymentStatus: 'verified',
      featureChoice: 'local',
      verified: true,
      profileProcess: TalentProcess.Completed
    },
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
    loading: false,
    skills: []
  },
  employments: {
    employments: [],
    employment: undefined,
    loading: false
  },
  educations: {
    loading: false,
    educations: [],
    education: undefined
  },
  messages: {
    message: 'success'
  },
  skills: {
    userSkill: [
      {
        skill: {
          _id: '5fcf1c5b11c16c41f7c6c723',
          skill: 'Python',
          createdAt: '2020-12-08T06:25:31.128Z',
          updatedAt: '2020-12-08T06:25:31.128Z',
        },
        level: 'intermediate',
        verificationStatus: 'verified',
        _id: '5fcf52105cd56b9843252696',
        createdAt: '2020-12-08T10:14:40.231Z',
        updatedAt: '2020-12-08T13:05:46.873Z',
      }
    ]
  }
};

describe('Talent Process', () => {
  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
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

  it('it should create snapshot', () => {
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

  describe('No Profile Process', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: { ...initialState.users.user, profileProcess: undefined }
        }
      });
    });

    it('no profile process', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is Current Role', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.CurrentRole
          }
        }
      });
    });

    it('current role', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is AddEducation', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.AddEducation
          }
        }
      });
    });

    it('current role', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is Recent Employer', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.RecentEmployer
          }
        }
      });
    });

    it('current role', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is Single Employment', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.SingleEmployment
          }
        }
      });
    });

    it('single employment', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is Single Education', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.SingleEducation
          }
        }
      });
    });

    it('single education', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is List Employment', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.ListEmployment
          }
        }
      });
    });

    it('current role', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });

  describe('When Profile Process is List Education', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          user: {
            ...initialState.users.user,
            profileProcess: TalentProcess.ListEducation
          }
        }
      });
    });

    it('current role', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <Component />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeDefined();
    });
  });
});
