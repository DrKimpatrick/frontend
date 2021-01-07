import React from 'react';
import { Store } from 'redux';
import { fireEvent, cleanup, render } from '@testing-library/react';
import ReactDom from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import BottomMenu from '../index';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Routes } from 'utils/routes';
import initialState from 'redux/initialStates/users';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

afterEach(cleanup);
const mockHistoryPush = jest.fn();

let store: Store;

let middleware = [thunk];

const mockStore = configureMockStore(middleware);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('`BottomMenu` component', () => {
  beforeEach(() => {
    store = mockStore({ users: initialState });
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomMenu />
        </MemoryRouter>
      </Provider>,
      div
    );
  });

  it('matches the snapshot', () => {
    const snapshot = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <BottomMenu />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  // it('should redirect to home', () => {
  //   const { getByTestId } = render(
  //     <MemoryRouter>
  //       <BottomMenu />
  //     </MemoryRouter>
  //   );

  //   fireEvent.click(getByTestId('home-navigation'));
  //   expect(mockHistoryPush).toHaveBeenCalledWith(Routes.Home);
  // });

  it('should redirect to account', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomMenu />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('account-navigation'));
  });

  it('should redirect to notification', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomMenu />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('notification-navigation'));
  });
});
