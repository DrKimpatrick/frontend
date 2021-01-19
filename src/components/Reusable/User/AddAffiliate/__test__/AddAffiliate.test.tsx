import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import Component from '../AddAffiliate';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    addAffiliate: true,
    addAffiliateLoading: true,
    errors: {
      message: 'error message',
      errors: [{ username: 'username is required' }]
    }
  },
  messages: {
    message: 'uploaded'
  }
};
const props = {
  closeModal: jest.fn()
};
describe('AddAffiliate', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
