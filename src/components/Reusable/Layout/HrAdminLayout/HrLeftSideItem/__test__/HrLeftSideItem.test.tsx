
import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../HrLeftSideItem';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

const props = {
  item: {
    header: {
      name: 'header',
      icon: 'icon'
    },
    list: [
      {
        name: 'name',
        rightItem: 'right'
      }
    ]
  }
};

describe('HrLeftSideItem', () => {
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

  it('should have name from list', () => {
    const { getByTestId } = render(
      <Router>
        <Component {...props} />
      </Router>
    );

    expect(getByTestId('h5Name')).toHaveTextContent(props.item.list[0].name);
  });
});