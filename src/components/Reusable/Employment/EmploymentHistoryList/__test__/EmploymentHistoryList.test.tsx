import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EmploymentHistoryList from '../EmploymentHistoryList';
import renderer from 'react-test-renderer';
import { initialState } from '../__mock__';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

afterEach(cleanup);
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useDispatch: jest.fn()
}));

let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('`EmploymentHistoryList` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <EmploymentHistoryList />
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
            <EmploymentHistoryList />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
