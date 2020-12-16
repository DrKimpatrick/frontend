import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Talent from '../Talent';

afterEach(cleanup);

const talentProps = {
  productDetails: {
    name: 'Talent Premium',
    features: [
      {
        name: 'Some name',
        detail: 'Some meaningful detail',
        available: true
      }
    ]
  },
  plans: [
    {
      id: 'unique-id',
      amount_decimal: 100,
      amount: '9.99',
      interval: 'month'
    }
  ],
  action: '/somewhere'
};

it('matches the snapshot', () => {
  const container = render(<Talent {...talentProps} />);
  expect(container).toMatchSnapshot();
});
