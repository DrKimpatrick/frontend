import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorMessageDialog from '../ErrorMessageDialog';

afterEach(cleanup);

const props = {
  title: 'We have a message',
  message: 'something went terribly wrong'
};

it('renders snapshot successfully', () => {
  const container = render(<ErrorMessageDialog {...props} />);
  expect(container).toMatchSnapshot();
});
