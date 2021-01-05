
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Component from '../Image';
import { cleanup, render } from '@testing-library/react';

const props = {
  src: 'http://image/image.png'
};

const mockSrcImage = {
  srcList: props.src,
  useSuspense: true
};

jest.mock('react-image', () => ({
  ...jest.requireActual('react-image'),
  useImage: () => ({
    srcList: mockSrcImage.srcList,
    useSuspense: mockSrcImage.useSuspense
  })
}));
describe('Image', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Suspense fallback={'loading'}>
        <Component {...props} />
      </Suspense>,
      div
    );
  });
  it('should create snapshot', () => {
    const tree = render(
      <Suspense fallback={'loading'}>
        <Component {...props} />
      </Suspense>
    );

    expect(tree).toMatchSnapshot();
  });
});
