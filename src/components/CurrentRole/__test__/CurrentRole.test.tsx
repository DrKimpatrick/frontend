import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CurrentRole from '../CurrentRole';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { initialState } from '../__mock__';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

let store: any;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('`CurrentRole` component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <CurrentRole />
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
            <CurrentRole />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should submit a form', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <CurrentRole />
        </Router>
      </Provider>
    );
    const companyName: Element | any = container.querySelector(
      'input[name="companyName"]'
    );

    const title: Element | any = container.querySelector('input[name="title"]');

    const startDate: Element | any = container.querySelector(
      'input[name="startDate"]'
    );

    const form: Element | any = container.querySelector('form');

    await waitFor(() => {
      fireEvent.change(companyName, {
        target: {
          value: 'companyName'
        }
      });
    });


    await waitFor(() => {
      fireEvent.change(startDate, {
        target: {
          value: '2020-05-05'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(title, {
        target: {
          value: 'title'
        }
      });
    });

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(companyName.value).toEqual('companyName');

    expect(title.value).toEqual('title');

    expect(startDate.value).toEqual('2020-05-05');

    expect(mockHistoryPush).toHaveBeenCalledWith('/skill-ranking');

  });
});
