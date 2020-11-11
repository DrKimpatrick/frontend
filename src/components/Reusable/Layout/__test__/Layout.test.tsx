import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../Layout';
import renderer from 'react-test-renderer';
import initialState from '../../../../redux/initialState';

const mockedWithValue = jest.fn();
const mockedHeightValue = jest.fn();

afterEach(cleanup);
afterAll(() => jest.unmock('../../../../utils/useWindowSize.ts'));

const mockStore = configureMockStore([thunk]);
describe('`Layout` component', () => {
  jest.mock('../../../../utils/useWindowSize.ts', () => ({
    width: mockedWithValue,
    height: mockedHeightValue
  }));
  let store: any;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <Layout>
            <div />
          </Layout>
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
            <Layout>
              <div />
            </Layout>
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches the snapshot on a small screen', () => {
    mockedWithValue.mockImplementation(() => 500);
    mockedHeightValue.mockImplementation(() => 500);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Layout>
              <div />
            </Layout>
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
