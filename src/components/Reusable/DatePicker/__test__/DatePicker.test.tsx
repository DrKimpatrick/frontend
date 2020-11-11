import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import DatePicker from '../DatePicker';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('`DatePicker` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <DatePicker label="date picker" defaultValue="11-11-1111" />,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(<DatePicker label="date picker" defaultValue="11-11-1111" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
