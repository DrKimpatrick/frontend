import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EmploymentHistoryList from '../EmploymentHistoryList';
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

describe('`EmploymentHistoryList` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Router>
        <EmploymentHistoryList />
      </Router>,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <EmploymentHistoryList />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
