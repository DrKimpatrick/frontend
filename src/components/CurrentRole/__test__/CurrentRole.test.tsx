import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import CurrentRole from '../CurrentRole';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import initialState from 'redux/initialState';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('`CurrentRole` component', () => {

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <CurrentRole />
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
            <CurrentRole />
        </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should redirect to skill ranking', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CurrentRole />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('next-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/skill-ranking');
  });
});
