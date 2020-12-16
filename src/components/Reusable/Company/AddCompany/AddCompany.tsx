import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormCompanySchool, FormTitle } from 'components/Reusable';
import { RootState } from 'redux/store';
import { addCompany } from 'redux/actions/company';
import { AdminsProcess } from 'redux/action-types/user';
import { iValues } from '../../Forms/FormCompanySchool';
import './AddCompany.scss';

const AddCompany: FC = () => {
  const reducer = useSelector((state: RootState) => {
    const { loading, errors } = state.companies;
    const { user } = state.users;
    return { loading, errors, user };
  });

  const dispatch = useDispatch();

  const onSubmitHandler = (values: iValues) => {
    if (reducer.user) {
      addCompany(values, {
        userId: reducer.user._id,
        profileProcess: AdminsProcess.Completed
      })(dispatch);
    }
  };

  return (
    <section className="add-company-section w-1/3 m-auto text-gray-texts mb-8">
      <FormTitle title="Tell us about your Company!" showBackArrow />
      <FormCompanySchool
        validationErrors={reducer.errors?.errors || null}
        onSubmitHandler={onSubmitHandler}
        loading={reducer.loading}
      />
    </section>
  );
};

export default AddCompany;
