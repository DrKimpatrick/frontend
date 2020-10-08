import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Testmonials from '../Testmonials';
import Slider from 'react-slick';
import { isTSAnyKeyword } from '@babel/types';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

let container: any;
let testmonialsProps: any;

describe('Account Type Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    testmonialsProps = {
      testData: [
        {
          title: 'test',
          description: 'the test description',
          userInfo: {
            userImage:
            'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
            name: 'Joe Doe',
            position: 'CTO at Snow Media'
          }
        }
      ]
    };
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDom.render(<Testmonials {...testmonialsProps} />, container);
  });

  it('should render title and desctiption correctly component correctly', () => {
    const props = {
      testData: [
        {
          title: 'test 2',
          description: 'the test description 2',
          userInfo: {
            userImage:
            'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
            name: 'Joe Doe',
            position: 'CTO at Snow Media'
          }
        }
      ]
    };

    const { getByText } = render(<Testmonials {...props} />);
    expect(getByText('test 2')).toBeInTheDocument();
    expect(getByText('the test description 2')).toBeInTheDocument();
  });
});
