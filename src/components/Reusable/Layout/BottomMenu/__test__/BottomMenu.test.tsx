import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react';
import ReactDom from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import BottomMenu from '../index';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { RouteUrl } from 'utils/routes';

afterEach(cleanup);
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('`BottomMenu` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <MemoryRouter>
        <BottomMenu />
      </MemoryRouter>,
      div
    );
  });

  it('matches the snapshot', () => {
    const snapshot = renderer
      .create(
        <MemoryRouter>
          <BottomMenu />
        </MemoryRouter>
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('should redirect to home', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomMenu />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('home-navigation'));
    expect(mockHistoryPush).toHaveBeenCalledWith(RouteUrl.Home);
  });

  it('should redirect to account', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomMenu />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('account-navigation'));
    expect(mockHistoryPush).toHaveBeenCalledWith(RouteUrl.Account);
  });

  it('should redirect to notification', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomMenu />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('notification-navigation'));
    expect(mockHistoryPush).toHaveBeenCalledWith(RouteUrl.Notification);
  });
});
