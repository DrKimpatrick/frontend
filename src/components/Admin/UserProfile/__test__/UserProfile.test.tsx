import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { cleanup, render, fireEvent } from '@testing-library/react';
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
      bio: 'bio',
      profilePicture: 'profile.png',
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
    specificUserLoading: false,
    userSkill: [],
    userEducationLoading: false,
    userEmploymentLoading: false,
    userSkillLoading: false
  },
  courses: {
    numberOfAcceptedCourse: 10,
    numberOfDeclinedCourse: 5,
    numberOfPendingCourse: 5
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

  describe('return loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          userEducationLoading: true,
          userEmploymentLoading: true,
          userSkillLoading: true
        }
      });
    });

    it('should return loadingComponent', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <UserProfile />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('change list item status', () => {
    it('should change status', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <UserProfile />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector(
        '.listItems .selectItems select'
      );

      fireEvent.change(div, () => ({
        target: {
          value: 'unverified'
        }
      }));

      expect(div).toBeDefined();
    });
  });
});
