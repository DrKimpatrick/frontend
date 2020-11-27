import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import FrontView from '../FrontView';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

let container: any;

describe('Front View Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup;
    document.body.removeChild(container);
    container = null;
  });

  it('renders without crashing', () => {
    act(() => {
      ReactDom.render(<FrontView />, container);
    });
  });

  it('should render title and description correctly component correctly', () => {
    const tree = renderer.create(<FrontView />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render Get Started and Watch Demo buttons correctly', () => {
    const { getByTestId } = render(<FrontView />);

    expect(getByTestId('frontView')).toHaveTextContent('Get Started');
    expect(getByTestId('frontView')).toHaveTextContent('Watch Demo');
  });
});
