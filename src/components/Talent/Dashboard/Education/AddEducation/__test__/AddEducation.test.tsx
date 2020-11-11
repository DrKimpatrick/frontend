import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AddEducation } from '..';
import { initialState } from '../__mock__';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

jest.mock('@material-ui/core/Modal');
describe('Add Education', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <AddEducation close={() => jest.fn()} />
      </Provider>,
      div
    );
  });
});
