import React from 'react';
import SideLoading from '../SideLoading';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
describe('Side Loading', () => {
  afterEach(cleanup);
  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<SideLoading />, div);
  });

  it('should create a snapshot', () => {
    const tree = renderer.create(<SideLoading />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render loading with provided size', () => {
    const tree = renderer.create(<SideLoading size={20} />).toJSON();

    expect(tree).toBeTruthy();
  });
});
