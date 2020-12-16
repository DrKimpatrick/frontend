import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Select from 'react-select';
import { map, get } from 'lodash';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { TalentProcess } from 'redux/action-types/user';
import { addEmployment, listEmployments } from 'redux/actions/employment';
import { currentRoleSchema } from './Schema';
import './CurrentRole.scss';

interface Props {
  setPreviousStep: (value: string) => void;
}

const CurrentRole: FC<Props> = props => {
  const { setPreviousStep } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employment } = state.employments;

    const { message } = state.messages;

    const { user } = state.users;

    return { message, loading, errors, employment, user };
  });

  const getErrors = (field: string) => {
    const { errors } = reducer;

    if (
      errors &&
      errors.errors &&
      Array.isArray(errors.errors) &&
      errors.errors.length > 0 &&
      map(errors.errors, field)
    ) {
      return (
        <>
          {map(map(errors.errors, field), (item, i) => (
            <div key={i} className="inputError">
              {item}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    listEmployments()(dispatch);
  }, [dispatch]);

  return (
    <>
      <section className="current-role-section w-1/3 m-auto text-gray-texts">
        <div className="containers">
          <div className="recent-employer-section">
            <div className="flex relative h-auto my-8">
              <div className="back-arrow cursor-pointer">
                <ArrowBackTwoToneIcon />
              </div>
              <h1 className="font-bold text-xl title">
                Tell us how awesome you are!
              </h1>
            </div>
            <Formik
              validateOnChange={false}
              validationSchema={currentRoleSchema}
              initialValues={{
                companyName: '',
                supervisor: {
                  name: '',
                  detail: {
                    name: '',
                    email: '',
                    phoneNumber: ''
                  }
                },
                title: '',
                startDate: '',
                isCurrentPosition: true,
                showDetail: false,
                currentSupervisor: ''
              }}
              onSubmit={values => {
                if (reducer.user) {
                  addEmployment({
                    ...values,
                    user: reducer.user,
                    profileProcess: TalentProcess.SkillRanking
                  })(dispatch);
                }
              }}
            >
              {formik => {
                const { errors, values } = formik;
                return (
                  <form
                    onSubmit={formik.handleSubmit}
                    autoComplete="off"
                    data-testid="submit-form"
                  >
                    <div className="text-gray-texts mt-8">
                      <label>What is your company name ? </label>
                      <input
                        type="text"
                        className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
                        placeholder="Company Name"
                        name="companyName"
                        value={values.companyName}
                        onChange={formik.handleChange}
                      />
                      {errors && errors.companyName && (
                        <div className="inputError">{errors.companyName}</div>
                      )}
                      {!errors ||
                        (!errors.companyName && getErrors('companyName'))}
                    </div>
                    <div className="text-gray-texts mt-4">
                      <label>What is your current role?</label>
                      <input
                        type="text"
                        className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height mt-2"
                        placeholder="Your Title"
                        value={values.title}
                        onChange={formik.handleChange}
                        name="title"
                      />
                      {errors && errors.title && (
                        <div className="inputError">{errors.title}</div>
                      )}
                      {!errors || (!errors.title && getErrors('title'))}
                    </div>
                    <div className="text-gray-texts mt-4">
                      <Select
                        options={[
                          { value: 'Staffing', label: 'Staffing' },
                          { value: 'Employee', label: 'Employee' },
                          { value: 'HR', label: 'HR' }
                        ]}
                        placeholder="Select your supervisor"
                        name="supervisor.name"
                        onChange={v => {
                          formik.setFieldValue(
                            'supervisor.name',
                            (v as any).value,
                            true
                          );
                          formik.setFieldValue('showDetail', true);
                          formik.setFieldValue(
                            'currentSupervisor',
                            (v as any).label
                          );
                        }}
                        values={
                          values.supervisor.name !== ''
                            ? {
                                value: values.supervisor,
                                label: values.supervisor
                              }
                            : null
                        }
                        isMulti={false}
                        styles={{
                          control: base => ({
                            ...base,
                            border: 0,
                            boxShadow: 'none'
                          })
                        }}
                        className="select"
                        defaultValue={
                          values.supervisor.name !== ''
                            ? {
                                value: values.supervisor.name,
                                label: values.supervisor.name
                              }
                            : null
                        }
                      />
                      {errors &&
                        errors.supervisor &&
                        errors.supervisor.name && (
                          <div className="inputError">
                            {errors.supervisor.name}
                          </div>
                        )}
                      {!errors ||
                        (!errors.supervisor && getErrors('supervisor'))}
                      {!errors ||
                        (!errors.supervisor && getErrors('supervisor.name'))}
                    </div>
                    {values.showDetail && (
                      <>
                        <div className="text-gray-texts mt-4">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentSupervisor} name`}
                            value={get(values.supervisor.detail, 'name', '')}
                            onChange={formik.handleChange}
                            name="supervisor.detail.name"
                          />
                          {errors &&
                            errors.supervisor &&
                            errors.supervisor.detail &&
                            errors.supervisor.detail.name && (
                              <div className="inputError">
                                {errors.supervisor.detail.name}
                              </div>
                            )}
                          {!errors ||
                            (!errors.supervisor &&
                              getErrors('supervisor.detail.name'))}
                        </div>
                        <div className="text-gray-texts mt-4">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentSupervisor} email`}
                            value={get(values.supervisor.detail, 'email', '')}
                            onChange={formik.handleChange}
                            name="supervisor.detail.email"
                          />
                          {errors &&
                            errors.supervisor &&
                            errors.supervisor.detail &&
                            errors.supervisor.detail.email && (
                              <div className="inputError">
                                {errors.supervisor.detail.email}
                              </div>
                            )}

                          {!errors ||
                            (!errors.supervisor &&
                              getErrors('supervisor.detail.email'))}
                        </div>
                        <div className="text-gray-texts mt-4">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentSupervisor} phone number`}
                            value={get(
                              values.supervisor.detail,
                              'phoneNumber',
                              ''
                            )}
                            onChange={formik.handleChange}
                            name="supervisor.detail.phoneNumber"
                          />
                          {errors &&
                            errors.supervisor &&
                            errors.supervisor.detail &&
                            errors.supervisor.detail.phoneNumber && (
                              <div className="inputError">
                                {errors.supervisor.detail.phoneNumber}
                              </div>
                            )}
                          {!errors ||
                            (!errors.supervisor &&
                              getErrors('supervisor.detail.phoneNumber'))}
                        </div>
                      </>
                    )}
                    <div
                      className="flex justify-between text-gray-texts mt-4 dateContainer"
                      style={{ flexDirection: 'column', alignItems: 'start' }}
                    >
                      <div className="item w-full h-full pt-2 mt-2">
                        <label>Start Date</label>
                        <input
                          id="date"
                          type="date"
                          name="startDate"
                          onChange={formik.handleChange}
                          value={values.startDate}
                        />
                      </div>
                      {errors && errors.startDate && (
                        <div className="inputError">{errors.startDate}</div>
                      )}
                      {!errors ||
                        (!errors.supervisor && getErrors('startDate'))}
                    </div>
                    <div className="flex justify-center mt-10 flex-col items-center">
                      <button
                        data-testid="next-button"
                        className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
                        type="submit"
                      >
                        <label className="">Next</label>{' '}
                        <ArrowRightAltTwoTone />
                      </button>
                      <Link
                        to="#"
                        className="my-5 font-bold"
                        onClick={() =>
                          setPreviousStep(TalentProcess.SkillRanking)
                        }
                      >
                        Skip
                      </Link>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentRole;
