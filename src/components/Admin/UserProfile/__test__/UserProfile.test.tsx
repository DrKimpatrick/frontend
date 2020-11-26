import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';
import ReactDom from 'react-dom';
import UserProfile from '../UserProfile';
import { UserRole } from 'redux/action-types/user';

let store: Store;

let middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    user: {
      username: 'username',
      roles: [UserRole.SuperAdmin],
      email: 'email@gmail.com',
      _id: 'id',
      employmentHistory: [],
      educationHistory: [],
      courses: []
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
    specificUser: {
      courses: [],
      _id: 'id',
      username: 'gramdb',
      email: 'gramdb@gmail.com',
      dateRegistered: '2020-10-30T07:41:16.417Z',
      updatedAt: '2020-11-11T13:13:36.270Z',
      employmentHistory: [
        {
          _id: 'id',
          companyName: 'companyName',
          verificationStatus: 'status'
        }
      ],
      educationHistory: [
        {
          _id: 'id',
          schoolName: 'companyName',
          verificationStatus: 'status'
        }
      ],
      roles: [
        UserRole.Talent,
        UserRole.CompanyAdmin,
        UserRole.HrAdmin,
        UserRole.RecruitmentAdmin,
        UserRole.TrainingAffiliate,
        UserRole.SuperAdmin
      ]
    },
    loading: false,
    userSkill: []
  }
};

describe('UserProfile', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <UserProfile />
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
            <UserProfile />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('render message when there are no result found', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          loading: true,
          specificUser: {
            ...initialState.users.specificUser,
            employmentHistory: [],
            educationHistory: []
          }
        }
      });
    });
    it('should return message when no result found', () => {
      render(
        <Provider store={store}>
          <Router>
            <UserProfile />
          </Router>
        </Provider>
      );
    });
  });

  describe('should return data when there are user skills', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userSkill: [
            {
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
            },
            {
              skill: {
                _id: '5fb8cebd750b0131d5a18ccd',
                skill: 'Vue JS',
                createdAt: '2020-11-21T08:24:29.803Z',
                updatedAt: '2020-11-21T08:24:29.803Z'
              },
              level: 'beginner',
              verificationStatus: 'unverified',
              _id: '5fb8d5cb750b0131d5a18cdb',
              createdAt: '2020-11-21T08:54:35.323Z',
              updatedAt: '2020-11-21T08:54:35.323Z'
            },
            {
              skill: {
                _id: '5fb8cebd750b0131d5a18cce',
                skill: 'Jquery',
                createdAt: '2020-11-21T08:24:29.804Z',
                updatedAt: '2020-11-21T08:24:29.804Z'
              },
              level: 'intermediate',
              verificationStatus: 'unverified',
              _id: '5fb8d5cb750b0131d5a18cdc',
              createdAt: '2020-11-21T08:54:35.323Z',
              updatedAt: '2020-11-21T08:54:35.323Z'
            }
          ]
        }
      });
    });

    it('should return user skills', () => {
      render(
        <Provider store={store}>
          <Router>
            <UserProfile />
          </Router>
        </Provider>
      );
    });
  });

  describe('return null', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userSkill: undefined,
          specificUser: {
            ...initialState.users.specificUser,
            educationHistory: undefined,
            employmentHistory: undefined
          }
        }
      });
    });

    it('should return null when there are no skills, employment and education', () => {
      render(
        <Provider store={store}>
          <Router>
            <UserProfile />
          </Router>
        </Provider>
      );
    });
  });

  describe('return ProfileNotFound', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          specificUser: null,
          errors: 'something wrong'
        }
      });
    });
    it('should return Profile Not Found when there is no profile', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <UserProfile />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector(
        '.profileNotFound .notFoundContainer .message'
      );

      expect(div).toHaveTextContent('Profile is not available');
    });
  });
});
