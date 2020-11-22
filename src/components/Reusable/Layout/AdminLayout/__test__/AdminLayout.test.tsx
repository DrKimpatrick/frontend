import React from 'react';
import { AdminLayout } from '..';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { initialState } from '../__mock__';

let store: Store;

let middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('AdminLayout', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <AdminLayout />
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
            <AdminLayout />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
