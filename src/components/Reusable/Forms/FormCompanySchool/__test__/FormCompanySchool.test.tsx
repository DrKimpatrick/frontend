import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import FormCompanySchool from '../FormCompanySchool';

const errors = [
  { accountManagerName: "Account manager name or title is required" },
  { address: "Address is required" },
  { email: "Email is required" },
  { name: "Name is required" },
  { phone: "Phone number is required" },
  { website: "Website is required" }
];

const initialValues = {
  name: 'company',
  address: 'address',
  website: 'website.com',
  accountManagerName: 'Manager name',
  email: 'email@email.com',
  phone: '+250782912345'
}

describe('Form for Company and School', () => {
  afterEach(cleanup);
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <FormCompanySchool validationErrors={errors} onSubmitHandler={() => { }} />
      </Router>,
      div
    )
  });

  it('should click submit btn', () => {
    const { container } = render(
      <Router>
        <FormCompanySchool validationErrors={null} onSubmitHandler={() => { }} initialValues={initialValues} />
      </Router>
    );
    const nextBtn: any = container.querySelector('.next-btn');
    expect(nextBtn).toBeTruthy();
    fireEvent.click(nextBtn);
  });

  it('should contains all inputs', () => {
    const { container } = render(
      <Router>
        <FormCompanySchool validationErrors={null} onSubmitHandler={() => { }} initialValues={initialValues} />
      </Router>
    );
   
    expect(container.querySelector('input[name="name"]')).toBeTruthy();
    expect(container.querySelector('input[name="address"]')).toBeTruthy();
    expect(container.querySelector('input[name="website"]')).toBeTruthy();
    expect(container.querySelector('input[name="accountManagerName"]')).toBeTruthy();
    expect(container.querySelector('input[name="email"]')).toBeTruthy();
    expect(container.querySelector('input[name="phone"]')).toBeTruthy();
  });
});
