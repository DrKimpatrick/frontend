import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { Warning } from '..';

describe('Warning', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Warning
        message={'message'}
        cancel={() => jest.fn()}
        accept={() => jest.fn()}
      />,
      div
    );
  });
});
