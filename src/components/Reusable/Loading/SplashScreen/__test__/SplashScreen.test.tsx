import React from 'react';
import ReactDom from 'react-dom';
import SplashScreen from '../SplashScreen';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

describe('SplashScreen', () => {
  afterEach(cleanup);
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<SplashScreen />, div);
  });

  it('should create snapshot', () => {
    const tree = renderer.create(<SplashScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
