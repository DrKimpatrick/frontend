import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ProfileNotFound from '../ProfileNotFound';
import { MemoryRouter } from 'react-router-dom';

const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistory,
  }),
}));

describe('ProfileNotFound', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <MemoryRouter>
        <ProfileNotFound />
      </MemoryRouter>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProfileNotFound />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should allow user to go back to dashboard', () => {
    const { container } = render(
      <MemoryRouter>
        <ProfileNotFound />
      </MemoryRouter>
    );

    const button: Element | any = container.querySelector('.w-full #goBack');

    fireEvent.click(button);
    expect(mockHistory).toBeDefined();
    expect(mockHistory).toBeCalled();
  });
});
