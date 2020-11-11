import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Steps from '../Steps';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';

let container: any;
let stepsProps: any;

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    stepsProps = {
      step: 1,
      details: 'Basic step'
    };
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(<Steps {...stepsProps} />, container);
  });

  it('should render title and desctiption correctly component correctly', () => {
    const { getByText } = render(
      <Steps step={3} details="This is the desctiption" />
    );
    expect(getByText('Step 1')).toBeInTheDocument();
    expect(getByText('This is the desctiption')).toBeInTheDocument();
  });

});
