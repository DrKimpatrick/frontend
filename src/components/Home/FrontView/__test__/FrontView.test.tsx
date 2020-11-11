import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import FrontView from '../FrontView';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

let container: any;
let frontViewProps: any;

describe('Front View Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    frontViewProps = {
      title: 'miss',
      description: 'Test description'
    };
  });

  afterEach(() => {
    cleanup;
    document.body.removeChild(container);
    container = null;
  });

  it('renders without crashing', () => {
    act(() => {
      ReactDom.render(<FrontView {...frontViewProps} />, container);
    });
  });

  it('should render title and desctiption correctly component correctly', () => {
    const { getByText } = render(
      <FrontView title="Title" description="This is the desctiption" />
    );
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('This is the desctiption')).toBeInTheDocument();
  });

  it('should render Get Started and Watch Demo buttons correctly', () => {
    const { getByTestId } = render(
      <FrontView title="Title" description="This is the desctiption" />
    );

    expect(getByTestId('frontView')).toHaveTextContent('Get Started');
    expect(getByTestId('frontView')).toHaveTextContent('Watch Demo');
  });
});
