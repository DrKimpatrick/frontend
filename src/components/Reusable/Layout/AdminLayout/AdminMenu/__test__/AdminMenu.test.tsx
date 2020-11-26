import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AdminMenu from '../AdminMenu';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { RouteUrl } from 'utils/routes';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'http://localhost:3000/admin-dashboard'
  })
}));

const initialState = {
  users: {
    activePath: RouteUrl.SuperAdminDashboard
  }
};
describe('AdminMenu', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <AdminMenu />
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
            <AdminMenu />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Hr Admin path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: RouteUrl.HrAdmin }
      });
    });
    it('should return HrAdmin path', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('Affiliate Path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: RouteUrl.Affiliate }
      });
    });
    it('should return Affiliate path', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('Training Affiliate path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: RouteUrl.TrainingAffiliate }
      });
    });
    it('should return Training Affiliate path', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('Company path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: RouteUrl.Company }
      });
    });
    it('should return Company path', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('Recruiter path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: RouteUrl.Recruiter }
      });
    });
    it('should return Recruiter path', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });

  describe('no active path', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        users: { ...initialState.users, activePath: null }
      });
    });
    it('should return undefined', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Router>
              <AdminMenu />
            </Router>
          </Provider>
        )
        .toJSON();

      expect(tree).toBeTruthy();
    });
  });
});
