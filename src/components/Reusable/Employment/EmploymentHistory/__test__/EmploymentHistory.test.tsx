import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmploymentHistory from '../EmploymentHistory';
import { initialState } from '../__mock__';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

const mockSetPreviousStep = jest.fn();

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('`EmploymentHistory` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <EmploymentHistory setPreviousStep={mockSetPreviousStep} />
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
            <EmploymentHistory setPreviousStep={mockSetPreviousStep} />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
