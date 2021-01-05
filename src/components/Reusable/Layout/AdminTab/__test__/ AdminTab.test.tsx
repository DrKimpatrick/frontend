import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Component from '../AdminTab';

const props = {
  menu: [{ name: 'Home', icon: 'icon', onClick: jest.fn(), url: '#' }],
  currentTab: 'tab'
};

describe('Admin menu', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Router>
        <Component {...props} />
      </Router>,
      div
    );
  });
  it('should create snapshot', () => {
    const tree = render(
      <Router>
        <Component {...props} />
      </Router>
    );
    expect(tree).toMatchSnapshot();
  });
});