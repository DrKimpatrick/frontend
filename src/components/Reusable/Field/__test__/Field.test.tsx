import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Field from '../Field';

describe(Field, () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const fieldProps = {
      onChange: jest.fn(),
      value: 'any value'
    };

    const container = render(<Field {...fieldProps} />);
    expect(container).toMatchSnapshot();
  });
});
