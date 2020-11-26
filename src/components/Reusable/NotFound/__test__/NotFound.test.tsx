import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import NotFound from '../NotFound';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
describe('NotFound', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(
      <Router>
        <NotFound />
      </Router>,
      div
    );
  });

  it('should render without crashing', () => {
    const tree = renderer
      .create(
        <Router>
          <NotFound />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render message and server error status', () => {
    const tree = renderer
      .create(
        <Router>
          <NotFound message="not found" serverError={true} back={true} />
        </Router>
      )
      .toJSON();

    expect(tree).toBeTruthy();
  });
});
