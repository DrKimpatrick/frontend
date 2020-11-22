import React from 'react';
import ReactDom from 'react-dom';
import NoItemFound from '../NoItemFound';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

describe('NoItemFound', () => {
  afterEach(cleanup);
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<NoItemFound message={'no result found'} />, div);
  });

  it('should create snapshot', () => {
    const tree = renderer
      .create(<NoItemFound message={'no result found'} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
