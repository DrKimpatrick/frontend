import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../HorizontalPagination';
import { cleanup, render } from '@testing-library/react';

const props = {
  pageCount: 5,
  page: 0,
  onPageChange: jest.fn()
};

describe('HorizontalPagination', () => {
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
