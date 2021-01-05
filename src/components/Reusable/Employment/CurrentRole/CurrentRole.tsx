import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { map, get, omit } from 'lodash';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { TalentProcess } from 'redux/action-types/user';
import { addEmployment, listEmployments } from 'redux/actions/employment';
import {
  EmploymentReference,
  EmploymentType,
  Supervisor
} from 'redux/action-types/employment';
import { CustomSelect, Loader } from 'components/Reusable';
import { currentRoleSchema } from './Schema';
import './CurrentRole.scss';

interface Props {
  setPreviousStep: (value: string) => void;
}

export const isEmpty = (value: string) => {
  const validate = !!(value.trim().length === 0 || value === '');

  return validate;
};

const CurrentRole: FC<Props> = props => {
  const { setPreviousStep } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { submitLoading: loading, errors, employment } = state.employments;

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
      <section className="current-role-section m-auto text-gray-texts">
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
                currentSupervisor: '',
                employmentType: '',
                reference: {
                  name: '',
                  detail: {
                    name: '',
                    email: '',
                    phoneNumber: ''
                  }
                },
                showReference: false,
                showReferenceDetail: false,
                currentReference: ''
              }}
              onSubmit={values => {
                if (reducer.user) {
                  let changeValue: any = values;
                  if (
                    (values.supervisor &&
                      values.supervisor.name === Supervisor.NA) ||
                    (values.supervisor && values.supervisor.name === '')
                  ) {
                    const newValue = omit(values, ['supervisor']);
                    changeValue = newValue;
                  }

                  if (
                    isEmpty(values.reference.name) ||
                    isEmpty(values.reference.detail.name) ||
                    isEmpty(values.reference.detail.email) ||
                    isEmpty(values.reference.detail.phoneNumber)
                  ) {
                    changeValue = omit(values, ['reference']);
                  }

                  addEmployment({
                    ...changeValue,
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
                      <CustomSelect
                        name="employmentType"
                        option={Object.values(EmploymentType).map(item => ({
                          name: item,
                          value: item
                        }))}
                        placeholder="Employment type"
                        value={values.employmentType}
                        onChange={value =>
                          formik.setFieldValue('employmentType', value, true)
                        }
                      />
                      {errors && errors.employmentType && (
                        <div className="inputError">
                          {errors.employmentType}
                        </div>
                      )}
                      {!errors ||
                        (!errors.employmentType && getErrors('employmentType'))}
                    </div>
                    <div className="text-gray-texts mt-4">
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
                      <CustomSelect
                        option={Object.values(Supervisor).map(item => ({
                          name: item,
                          value: item
                        }))}
                        placeholder="Supervisor"
                        onChange={value => {
                          formik.setFieldValue('supervisor.name', value, true);
                          if (value === Supervisor.NA) {
                            formik.setFieldValue('showReference', true);
                            formik.setFieldValue('showDetail', false);
                          } else {
                            formik.setFieldValue('showDetail', true);
                            formik.setFieldValue('currentSupervisor', value);
                            formik.setFieldValue('showReference', false);
                            formik.setFieldValue('showReferenceDetail', false);
                            formik.setFieldValue('reference', {
                              name: '',
                              detail: {
                                name: '',
                                email: '',
                                phoneNumber: ''
                              }
                            });
                          }
                        }}
                        name="supervisor.name"
                        value={get(values.supervisor, 'name', '')}
                      />
                      {getErrors('supervisor')}
                    </div>
                    {values.showDetail && values.supervisor && (
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
                        </div>
                      </>
                    )}
                    {values.showReference && (
                      <div className="text-gray-texts mt-4">
                        <CustomSelect
                          option={Object.values(EmploymentReference).map(
                            item => ({
                              name: item,
                              value: item
                            })
                          )}
                          placeholder="Reference"
                          onChange={value => {
                            formik.setFieldValue('reference.name', value, true);
                            formik.setFieldValue('showReferenceDetail', true);
                            formik.setFieldValue('currentReference', value);
                          }}
                          name="reference.name"
                          value={values.reference.name}
                        />
                        {getErrors('reference')}
                      </div>
                    )}

                    {values.showReferenceDetail && values.reference && (
                      <>
                        <div className="text-gray-texts mt-4">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentReference} name`}
                            value={get(values.reference.detail, 'name', '')}
                            onChange={formik.handleChange}
                            name="reference.detail.name"
                          />
                        </div>
                        <div className="text-gray-texts mt-2">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentReference} email`}
                            value={get(values.reference.detail, 'email', '')}
                            onChange={formik.handleChange}
                            name="reference.detail.email"
                          />
                        </div>
                        <div className="text-gray-texts mt-2">
                          <input
                            type="text"
                            className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                            placeholder={`${values.currentReference} phone number`}
                            value={get(
                              values.reference.detail,
                              'phoneNumber',
                              ''
                            )}
                            onChange={formik.handleChange}
                            name="reference.detail.phoneNumber"
                          />
                        </div>
                      </>
                    )}
                    <div
                      className="flex justify-between text-gray-texts mt-4 dateContainer"
                      style={{ flexDirection: 'column', alignItems: 'start' }}
                    >
                      <div className="item w-full h-full pt-1 pb-1 mt-2">
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
                        disabled={reducer.loading}
                      >
                        <Loader
                          loading={reducer.loading}
                          command={
                            <>
                              <label className="">Next</label>{' '}
                              <ArrowRightAltTwoTone />
                            </>
                          }
                        />
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
