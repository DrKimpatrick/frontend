import React from 'react';
import ReactDom from 'react-dom';
import ListItem from '../ListItem';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

const props = {
  listItem: {
    id: 'id',
    name: 'name',
    status: 'status'
  }
};

describe('List Item', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(<ListItem {...props} />, div);
  });

  it('should create snapshot', () => {
    const tree = renderer.create(<ListItem {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
