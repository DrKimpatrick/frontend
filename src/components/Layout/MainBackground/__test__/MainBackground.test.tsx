import React from 'react';
import ReactDom from 'react-dom';
import MainBackground from '../MainBackground';
import renderer from 'react-test-renderer';

describe('`MainBackground`', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<MainBackground />, div);
  });

  it('should render correctly', () => {
    const tree = renderer.create(<MainBackground />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
