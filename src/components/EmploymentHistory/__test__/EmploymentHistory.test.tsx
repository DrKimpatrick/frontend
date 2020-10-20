import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EmploymentHistory from '../EmploymentHistory';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('`EmploymentHistory` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Router>
        <EmploymentHistory />
      </Router>,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <EmploymentHistory />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
