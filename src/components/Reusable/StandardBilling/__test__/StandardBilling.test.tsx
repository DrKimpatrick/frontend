import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StandardBilling from '../StandardBilling';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../../redux/initialState';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useLocation: () => ({
    state: {
      plans: [
        {
          amount: 9.99,
          interval: 'month'
        },
        {
          amount: 9.99,
          interval: 'year'
        }
      ],
      features: [
        {
          available: true,
          name: 'Some feature name',
          detail: 'Some details are being written here'
        }
      ]
    }
  })
}));

describe('`StandardBilling` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <StandardBilling />
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
            <StandardBilling />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
