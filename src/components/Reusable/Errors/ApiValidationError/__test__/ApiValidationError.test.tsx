import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Component from '../ApiValidationError';
import renderer from 'react-test-renderer';

const props = {
  fieldName: 'username',
  errors: [
    {
      username: 'username is required'
    }
  ]
};

describe('ApiValidationError', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Component {...props} />, div);
  });

  it('should create component', () => {
    const tree = renderer.create(<Component {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should return empty when errors is not array', () => {
    const newProps = {
      ...props,
      errors: 'string'
    };
    const tree = render(<Component {...newProps} />);

    expect(tree).toBeTruthy();
  });
});
