import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserItem from '../UserItem';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { VerificationStatus } from 'redux/action-types/employment';

const props = {
  items: [
    {
      _id: 'id',
      username: 'username',
      signupMode: 'SOCIAL',
      verified: true,
      featureChoice: 'free',
      paymentStatus: 'unpaid',
      employmentHistory: [],
      educationHistory: [],
      courses: [],
      skills: [],
      firstName: 'bigUser',
      email: 'janedoe@gmail.com',
      dateRegistered: '2020-10-29T11:45:13.213Z',
      updatedAt: '2020-10-29T11:45:13.213Z',
      roles: ['role']
    }
  ],
  view: jest.fn(),
  totalItems: 10,
  itemPerPage: 2,
  pageChange: jest.fn(),
  currentPage: 1
};
describe('UserItem', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Router>
        <UserItem {...props} />
      </Router>,
      div
    );
  });

  it('it should create snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <UserItem {...props} />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should allow admin to view user profile', () => {
    const { container } = render(
      <Router>
        <UserItem {...props} />
      </Router>
    );

    const button: Element | any = container.querySelector('.details button');

    expect(fireEvent.click(button)).toBe(true);
  });

  it('should return employment history', () => {
    const newProps = {
      ...props,
      items: [
        {
          ...props.items[0],
          employmentHistory: [
            {
              isCurrentPosition: true,
              responsibilities: [],
              accomplishments: [],
              verificationStatus: VerificationStatus.UNVERIFIED,
              _id: '5fa405ce31b38a19f9c262d2',
              companyName: 'company',
              title: 'Senior software engineer',
              supervisor: 'Employee',
              favoriteProject: '',
              startDate: '2020-11-05T00:00:00.000Z',
              endDate: '2020-11-26T00:00:00.000Z',
              userId: '5f9bc39cb8398b2876606fc6',
              createdAt: '2020-11-05T14:01:50.395Z',
              updatedAt: '2020-11-05T14:01:50.395Z'
            }
          ]
        }
      ]
    };

    const { container } = render(
      <Router>
        <UserItem {...newProps} />
      </Router>
    );

    const h1 = container.querySelector('.userItems .details h1');

    expect(h1).toBeDefined();
  });

  it('should return last update employment history when current position is false', () => {
    const newProps = {
      ...props,
      items: [
        {
          ...props.items[0],
          employmentHistory: [
            {
              isCurrentPosition: false,
              responsibilities: [],
              accomplishments: [],
              verificationStatus: VerificationStatus.UNVERIFIED,
              _id: '5fa405ce31b38a19f9c262d2',
              companyName: 'company',
              title: 'Senior software engineer',
              supervisor: 'Employee',
              favoriteProject: '',
              startDate: '2020-11-05T00:00:00.000Z',
              endDate: '2020-11-26T00:00:00.000Z',
              userId: '5f9bc39cb8398b2876606fc6',
              createdAt: '2020-11-05T14:01:50.395Z',
              updatedAt: '2020-11-05T14:01:50.395Z'
            }
          ]
        }
      ]
    };

    const { container } = render(
      <Router>
        <UserItem {...newProps} />
      </Router>
    );

    const h1 = container.querySelector('.userItems .details h1');

    expect(h1).toBeDefined();
  });

  it('should return no result found when no item is available', () => {
    const newProps = {
      ...props,
      items: []
    };

    const { container } = render(
      <Router>
        <UserItem {...newProps} />
      </Router>
    );

    const div = container.querySelector('.userNotFound');

    expect(div).toBeDefined();
  });
});
