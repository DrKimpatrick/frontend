import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Authentication from '../Authentication';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

let container: any;
let stepsProps: any;

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(<Authentication  />, container);
  });


});