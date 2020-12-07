import React from 'react';
import Component from '../AddSkill';
import { cleanup, render, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

const addSkillProps = {
  initialValue: {
    skill: ''
  },
  close: jest.fn(),
  buttonName: 'save',
  loading: false,
  submit: jest.fn(),
  title: 'title',
  apiError: {
    errors: [
      {
        '[0].skill': 'required'
      }
    ],
    error: 'token',
    message: 'token'
  }
};

describe('Skill Component', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Router>
        <Component {...addSkillProps} />
      </Router>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Router>
        <Component {...addSkillProps} />
      </Router>
    );

    expect(tree).toMatchSnapshot();
  });

  // it('should close modal', () => {
  //   const { container } = render(
  //     <Router>
  //       <Component {...addSkillProps} />
  //     </Router>
  //   );
  //   const element: Element | any = container.querySelector('.addSkillModal');

  //   fireEvent.click(element);
  // });
});
