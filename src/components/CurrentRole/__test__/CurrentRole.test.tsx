import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import CurrentRole from '../CurrentRole';
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

describe('`CurrentRole` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Router>
        <CurrentRole />
      </Router>,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <CurrentRole />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should redirect to skill ranking', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CurrentRole />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('next-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/skill-ranking');
  });
});
