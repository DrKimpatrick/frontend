import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Component from '../CustomSelect';
import ReactDOM from 'react-dom';

const props = {
  onChange: jest.fn(),
  option: [{ name: 'name', value: 'value' }],
  placeholder: 'select options',
  name: 'name',
  value: 'value'
};

describe('CustomSelect', () => {
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
