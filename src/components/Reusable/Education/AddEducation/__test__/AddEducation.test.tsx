import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AddEducation from '../AddEducation';
import renderer from 'react-test-renderer';
import { initialState } from '../__mock__';

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const mockSetPreviousStep = jest.fn();

describe('`AddEducation` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <AddEducation setPreviousStep={mockSetPreviousStep} />
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
            <AddEducation setPreviousStep={mockSetPreviousStep} />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
