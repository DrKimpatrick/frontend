import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../AffiliateProfile';
import { cleanup, render } from '@testing-library/react';
import { UserRole } from 'redux/action-types/user';

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
  ]
};
describe('AffiliateProfile', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Component {...props} />, div);
  });

  it('should create snapshot', () => {
    const tree = render(<Component {...props} />);

    expect(tree).toMatchSnapshot();
  });
});
