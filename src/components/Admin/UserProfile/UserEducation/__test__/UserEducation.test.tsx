import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Store } from 'redux';
import { cleanup, render } from '@testing-library/react';
import Component from '../UserEducation';
import { VerificationStatus } from 'redux/action-types/education';
import configureMockStore from 'redux-mock-store';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const education = {
  _id: 'id',
  schoolName: 'companyName',
  verificationStatus: VerificationStatus.Verified,
  startDate: 'startDate',
  endDate: 'endDate',
  specializations: ['specialization'],
  isCurrentEducation: false,
  degreeOrCertification: 'degree',
  accomplishments: ['IT'],
  level: 'level'
};

const props = {
  education: [education],
  userEducationLoading: false
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
        <Component {...props} education={[]} />
      </Provider>
    );

    const message = container.querySelector('.notFound h5');

    expect(message).toHaveTextContent('There are no education');
  });

  it('should return loading spinner', () => {
    const { container } = render(
      <Provider store={store}>
        <Component {...props} userEducationLoading={true} />
      </Provider>
    );

    const loading = container.querySelector('.sideLoading');

    expect(loading).toBeDefined();
  });
});
