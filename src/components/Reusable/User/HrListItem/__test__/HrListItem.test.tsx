import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../HrListItem';
import { cleanup, render } from '@testing-library/react';

const props = {
  name: 'name',
  link: 'https://link.com'
};

describe('Admin List', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Component {...props} />, div);
  });

  it('should create snapshot', () => {
    const tree = render(<Component {...props} />);

    expect(tree).toMatchSnapshot();
  });

  it('should display name only', () => {
    const tree = render(<Component name={props.name} />);

    expect(tree).toBeTruthy();
  });
});