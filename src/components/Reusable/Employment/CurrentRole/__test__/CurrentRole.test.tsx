import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CurrentRole from '../CurrentRole';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { initialState } from '../__mock__';

const mockSetPreviousStep = jest.fn();

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
          <CurrentRole setPreviousStep={mockSetPreviousStep} />
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
            <CurrentRole setPreviousStep={mockSetPreviousStep} />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
