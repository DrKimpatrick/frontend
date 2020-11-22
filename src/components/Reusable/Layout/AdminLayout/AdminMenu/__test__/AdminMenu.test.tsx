import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AdminMenu from '../AdminMenu';
import { cleanup } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'http://localhost:3000/admin-dashboard'
  })
}));
describe('AdminMenu', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Router>
        <AdminMenu />
      </Router>,
      div
    );
  });

  it('it should create snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <AdminMenu />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
