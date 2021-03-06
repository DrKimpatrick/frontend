import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import TrainingAffiliate from '../Affiliate';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
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
    usersByRole: {
      users: [],
      totalDocs: 10,
      currentPage: 10
    },
    loading: false
  },
  courses: {
    numberOfPendingCourse: 4,
    numberOfAcceptedCourse: 4,
    numberOfDeclinedCourse: 5
  }
};
describe('TrainingAffiliate', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <TrainingAffiliate />
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
            <TrainingAffiliate />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('render user items', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: {
          ...initialState.users,
          loading: false,
          usersByRole: {
            ...initialState.users.usersByRole,
            users: [
              {
                _id: 'id',
                username: 'username',
                signupMode: 'SOCIAL',
                verified: true,
                featureChoice: 'free',
                paymentStatus: 'unpaid',
                employmentHistory: [],
                educationHistory: [],
                courses: [],
                skills: [],
                firstName: 'bigUser',
                email: 'janedoe@gmail.com',
                dateRegistered: '2020-10-29T11:45:13.213Z',
                updatedAt: '2020-10-29T11:45:13.213Z',
                roles: ['role']
              }
            ]
          }
        }
      });
    });

    it('should return list of users', () => {
      const { container } = render(
        <Provider store={store}>
          <Router>
            <TrainingAffiliate />
          </Router>
        </Provider>
      );

      const h1: Element | any = container.querySelector('.details h1');

      expect(h1).toBeTruthy();
    });
  });

  describe('render loading', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, loading: true }
      });
    });

    it('it should return LoadingComponent', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <TrainingAffiliate />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });
});
