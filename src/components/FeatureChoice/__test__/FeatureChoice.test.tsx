import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup } from 'utils/test-utils';
import { cache } from 'swr';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import FeatureChoice from '../FeatureChoice';
import initialState from 'redux/initialState';

describe(FeatureChoice, () => {
  let store: any;
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    cache.clear();
    cleanup();
  });

  it('matched the snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <FeatureChoice />
        </Router>
      </Provider>,
      {}
    );
    expect(tree).toMatchSnapshot();
  });
});
