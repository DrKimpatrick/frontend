import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import Button from '../Button';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Button />, div);
  console.log('div');
});

it('should render button component correctly', () => {
  const { getByTestId } = render(<Button label="click me please" />);
  expect(getByTestId('button')).toHaveTextContent('click me please');
});

it('should render button component correctly', () => {
  const { getByTestId } = render(<Button label="save" />);
  expect(getByTestId('button')).toHaveTextContent('save');
});

it('matches the snapshot', () => {
  const tree = renderer.create(<Button label="save" />).toJSON();
  expect(tree).toMatchSnapshot();
});
