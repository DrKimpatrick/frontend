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

const mockHistoryPush = jest.fn();

let store: any;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

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
          <AddEducation />
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
            <AddEducation />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow user to add education', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AddEducation />
        </Router>
      </Provider>
    );

    const schoolName: Element | any = container.querySelector(
      'input[name="schoolName"]'
    );

    const level: Element | any = container.querySelector('input[name="level"]');

    const degree: Element | any = container.querySelector(
      'input[name="degreeOrCertification"]'
    );

    const startDate: Element | any = container.querySelector(
      'input[name="startDate"]'
    );

    const endDate: Element | any = container.querySelector(
      'input[name="endDate"]'
    );

    const currentEducation: Element | any = container.querySelector(
      'input[name="isCurrentEducation"]'
    );

    const form: Element | any = container.querySelector('form');

    await waitFor(() => {
      fireEvent.change(schoolName, {
        target: {
          value: 'schoolname'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(level, {
        target: {
          value: 'level'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(degree, {
        target: {
          value: 'degree'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(startDate, {
        target: {
          value: '2020-10-05'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(endDate, {
        target: {
          value: '2020-10-05'
        }
      });
    });

    await waitFor(() => {
      fireEvent.change(currentEducation, {
        target: {
          value: true
        }
      });
    });

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/education-history',
      state: { educationId: 'id' }
    });
  });
});
