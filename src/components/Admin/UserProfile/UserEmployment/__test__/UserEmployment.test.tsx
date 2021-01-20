import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Store } from 'redux';
import { cleanup, render } from '@testing-library/react';
import Component from '../UserEmployment';
import { VerificationStatus } from 'redux/action-types/employment';
import configureMockStore from 'redux-mock-store';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const employment = {
  _id: 'id',
  companyName: 'companyName',
  verificationStatus: VerificationStatus.VERIFIED,
  startDate: 'startDate',
  endDate: 'endDate',
  title: 'title',
  skillsUsed: ['TS'],
  isCurrentPosition: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  employmentType: 'Contract'
};

const props = {
  employment: [employment],
  userEmploymentLoading: false
};

describe('UserEducation', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  it('should return no result found', () => {
    const { container } = render(
      <Provider store={store}>
        <Component {...props} employment={[]} />
      </Provider>
    );

    const message = container.querySelector('.notFound h5');

    expect(message).toHaveTextContent('There are no employment');
  });

  it('should return loading spinner', () => {
    const { container } = render(
      <Provider store={store}>
        <Component {...props} userEmploymentLoading={true} />
      </Provider>
    );

    const loading = container.querySelector('.sideLoading');

    expect(loading).toBeDefined();
  });
});
