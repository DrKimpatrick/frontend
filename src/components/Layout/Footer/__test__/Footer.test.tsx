import { cleanup } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../index';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('`Footer` component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Router>
        <Footer />
      </Router>,
      div
    );
  });

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <Footer />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
