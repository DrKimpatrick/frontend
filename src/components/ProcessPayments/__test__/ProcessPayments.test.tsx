import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup } from 'utils/test-utils';
import { cache } from 'swr';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Elements } from '@stripe/react-stripe-js';

import ProcessPayments from '../ProcessPayments';
import initialState from 'redux/initialState';
import { mockElement, mockElements, mockStripe } from '../__mocks__';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      plan: {
        id: 'some-unique-id'
      }
    }
  })
}));

jest.mock('@stripe/react-stripe-js', () => {
  const stripe = jest.requireActual('@stripe/react-stripe-js');

  return {
    ...stripe,
    Element: () => {
      return mockElement;
    },
    useStripe: () => {
      return mockStripe;
    },
    useElements: () => {
      return mockElements;
    }
  };
});

describe(ProcessPayments, () => {
  let store: any;
  let stripe: any;
  let stripePromise: any;
  let mockElements: any;
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  beforeEach(() => {
    store = mockStore(initialState);
    stripe = mockStripe();
    stripePromise = Promise.resolve(stripe);
    mockElements = Symbol('MockElements');
    stripe.elements.mockReturnValue(mockElements);
  });

  afterEach(() => {
    cache.clear();
    cleanup();
  });

  it('matches the snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Elements stripe={stripe}>
          <Router>
            <ProcessPayments />
          </Router>
        </Elements>
      </Provider>,
      {}
    );
    expect(tree).toMatchSnapshot();
  });
});
