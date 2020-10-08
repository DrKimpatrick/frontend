import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Landing from '../Landing';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { create, act } from 'react-test-renderer';

let container: any;
describe('Landing Page Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(<Landing />, container);

    afterEach(cleanup);
  });

  it('should render Texts included on component correctly', () => {
    const { getByTestId } = render(<Landing />);

  });
});
