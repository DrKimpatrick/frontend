import React from 'react';
import Component from '../AddItem';
import { cleanup, render } from '@testing-library/react';
import ReactDOM from 'react-dom';

const props = {
  closeModal: jest.fn(),
  title: 'title'
};
describe('Add Item', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Component {...props} />, div);
  });

  it('should create snapshot', () => {
    const tree = render(<Component {...props} />);

    expect(tree).toMatchSnapshot();
  });
});
