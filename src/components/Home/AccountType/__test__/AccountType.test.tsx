import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactDom from 'react-dom';
import AccountType from '../AccountType';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';
import { create, act } from 'react-test-renderer';

let container: any;
let accountsProps: any;

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    accountsProps = {
      title: 'string',
      description: 'string'
    };
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(<AccountType {...accountsProps} />, container);
  });

});
