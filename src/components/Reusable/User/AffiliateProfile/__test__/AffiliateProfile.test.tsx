import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { cleanup, render } from '@testing-library/react';
import Component from '../AffiliateProfile';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  courses: {
    coursesStats: {
    views: 4,
    conversionRate: 23
  },
  coursesStatsLoading: false,
  quarterlyCommission: 120,
  quarterlyCommissionLoading: false
  }
};

const props = {
  courses: [
    {
      currentLangSpecsUpdated: false,
      verificationStatus: 'pending',
      description: 'desc',
      _id: 'id',
      name: 'React Crash Course',
      instructor: 'Ryan Dahl',
      languageTaught: 'English',
      existingCourseLink: 'link',
      coverImageLink: 'link',
      level: 'advanced',
      duration: '5 Hr',
      userId: {
        _id: 'id',
        username: 'id',
        email: 'email'
      },
      createdAt: 'date',
      updatedAt: 'date'
    }
  ],
   affiliateId: 'affiliateId'
};

describe('AffiliateProfile', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Component {...props} />
        </Router>
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Component {...props} />
          </Router>
        </Provider>
      )
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
