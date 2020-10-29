import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import EducationHistoryList from '../EducationHistoryList';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import initialState from 'redux/initialState';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('`EducationHistoryList` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <EducationHistoryList />
        </Router>
      </Provider>,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <EducationHistoryList />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
