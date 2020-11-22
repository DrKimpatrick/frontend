import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import { cleanup, render, fireEvent } from '@testing-library/react';
import AffiliateItem from '../AffiliateItem';

let store: Store;

let middleware = [thunk];

let mockStore = configureMockStore(middleware);

const mockSetOffset = jest.fn();

const mockSetPage = jest.fn();

const mockDispatch = jest.fn();

const props = {
  currentPage: 1,
  setOffset: mockSetOffset,
  setPage: mockSetPage,
  items: [
    {
      _id: 'courseId',
      name: 'courseName',
      userId: {
        username: 'username',
        email: 'email@gmail.com',
        avatar: 'avatar.png'
      },
      existingCourseLink: 'https://link.com',
      coverImageLink: 'https://coverImage.com/image.png',
      verificationStatus: 'pending',
      instructor: 'instructor',
      languageTaught: 'english',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      currentLangSpecsUpdated: true
    }
  ],
  totalItems: 1,
  itemPerPage: 2,
  pageChange: jest.fn(),
  offset: 0,
  type: 'CourseTypes'
};

describe('AffiliateItem', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(cleanup);

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: mockDispatch
  }));

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Provider store={store}>
        <AffiliateItem {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AffiliateItem {...props} />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('User should change status', () => {
    it('should allow user to change status', () => {
      const { container } = render(
        <Provider store={store}>
          <AffiliateItem {...props} />
        </Provider>
      );

      const selectMenu: HTMLSelectElement | any = container.querySelector(
        'select'
      );

      fireEvent.change(selectMenu, () => ({
        target: {
          value: 'love'
        }
      }));

      expect(mockDispatch).toBeTruthy();
    });

    it('should allow user to change even when items is more than one', () => {
      const newCourses = [props.items[0], props.items[0]];

      const newProps = {
        ...props,
        items: newCourses
      };
      const { container } = render(
        <Provider store={store}>
          <Router>
            <AffiliateItem {...newProps} />
          </Router>
        </Provider>
      );

      const selectMenu: HTMLSelectElement | any = container.querySelector(
        'select'
      );

      fireEvent.change(selectMenu, () => ({
        target: {
          value: 'love'
        }
      }));

      expect(mockDispatch).toBeTruthy();
    });
  });

  describe('render not found component', () => {
    it('should render not found component', () => {
      const newProps = {
        ...props,
        items: []
      };
      const { container } = render(
        <Provider store={store}>
          <Router>
            <AffiliateItem {...newProps} />
          </Router>
        </Provider>
      );

      const div: Element | any = container.querySelector('.message');

      expect(div).toHaveTextContent('No result found');
    });
  });
});
