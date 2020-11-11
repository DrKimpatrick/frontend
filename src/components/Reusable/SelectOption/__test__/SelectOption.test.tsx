import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import SelectOption from '../SelectOption';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('`SelectOption` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <SelectOption
        isMulti
        options={[{ value: 'Software Engineer', label: 'Software Engineer' }]}
      />,
      div
    );
  });

  it('matches the snapshot for multiple select', () => {
    const tree = renderer
      .create(
        <SelectOption
          isMulti
          options={[{ value: 'Software Engineer', label: 'Software Engineer' }]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches the snapshot for simple select', () => {
    const tree = renderer
      .create(
        <SelectOption
          options={[{ value: 'Software Engineer', label: 'Software Engineer' }]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
