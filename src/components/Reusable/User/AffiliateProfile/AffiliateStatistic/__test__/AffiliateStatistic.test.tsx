import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../AffiliateStatistic';
import { cleanup, render } from '@testing-library/react';

const props = {
  item: [
    {
      name: 'name',
      rate: 'rate',
      icon: 'icon'
    }
  ]
};
describe('AffiliateStatistic', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Component {...props} />, div);
  });

  it('should create snapshot', () => {
    const tree = render(<Component {...props} />);

    expect(tree).toMatchSnapshot();
  });
});
