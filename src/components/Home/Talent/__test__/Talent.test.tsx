import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactDom from 'react-dom';
import Talent from '../Talent';
import { isTSAnyKeyword } from '@babel/types';
import renderer from 'react-test-renderer';

afterEach(cleanup);

const talentProps = {
  title: 'miss',
  details: []
};
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Talent {...talentProps} />, div);
});
