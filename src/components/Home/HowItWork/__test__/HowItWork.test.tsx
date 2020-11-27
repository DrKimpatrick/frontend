import React from 'react';
import renderer from 'react-test-renderer';
import HowItWork from '../HowItWork';
import { cleanup, render, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';

const mockSetStepName = jest.fn();
describe('HowItWork', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<HowItWork setStepName={mockSetStepName} />, div);
  });

  it('should create snapShot', () => {
    const tree = renderer
      .create(<HowItWork setStepName={mockSetStepName} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should set active step', () => {
    const { container } = render(<HowItWork setStepName={mockSetStepName} />);

    const button: Element | any = container.querySelector('.buttons');

    fireEvent.click(button);

    expect(button).toBeDefined();
  });
});
