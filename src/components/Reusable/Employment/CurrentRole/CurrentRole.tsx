import React, { FC, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Select from 'react-select';
import { map } from 'lodash';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { addEmployment, listEmployments } from 'redux/actions/employment';
import MainBackground from '../../Layout/MainBackground/MainBackground';
import { currentRoleSchema } from './Schema';
import './CurrentRole.scss';

const CurrentRole: FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employment } = state.employments;
    const { message } = state.messages;
    return { message, loading, errors, employment };
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
    if (reducer.message && reducer.employment) {
      history.push('/skill-ranking');
    }
  }, [reducer.message, reducer.employment, history]);

  useEffect(() => {
    listEmployments()(dispatch);
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <section className="current-role-section w-1/3 m-auto text-textGray">
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
                supervisor: '',
                title: '',
                startDate: '',
                isCurrentPosition: true
              }}
              onSubmit={values => addEmployment(values)(dispatch)}
            >
              {formik => {
                const { errors, values } = formik;
                return (
                  <form
                    onSubmit={formik.handleSubmit}
                    autoComplete="off"
                    data-testid="submit-form"
                  >
                    <div className="text-textGray mt-8">
                      <label>What is your company name ? </label>
                      <input
                        type="text"
                        className="border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height"
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
                    <div className="text-textGray mt-4">
                      <label>What is your current role?</label>
                      <input
                        type="text"
                        className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
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
                    <div className="text-textGray mt-4">
                      <label>Your supervisor </label>
                      <Select
                        options={[
                          { value: 'Staffing', label: 'Staffing' },
                          { value: 'Employee', label: 'Employee' },
                          { value: 'HR', label: 'HR' }
                        ]}
                        placeholder="Select your supervisor"
                        name="supervisor"
                        onChange={v =>
                          formik.setFieldValue(
                            'supervisor',
                            (v as any).value,
                            true
                          )
                        }
                        values={
                          values.supervisor !== ''
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
                          values.supervisor !== ''
                            ? {
                                value: values.supervisor,
                                label: values.supervisor
                              }
                            : null
                        }
                      />
                      {errors && errors.supervisor && (
                        <div className="inputError">{errors.supervisor}</div>
                      )}
                      {!errors ||
                        (!errors.supervisor && getErrors('supervisor'))}
                    </div>
                    <div
                      className="flex justify-between text-textGray mt-4 dateContainer"
                      style={{ flexDirection: 'column', alignItems: 'start' }}
                    >
                      <div className="item" style={{ width: '100%' }}>
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
                    <div className="flex justify-center mt-4">
                      <button
                        data-testid="next-button"
                        className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
                        type="submit"
                      >
                        <label className="">Next</label>{' '}
                        <ArrowRightAltTwoTone />
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default withRouter(CurrentRole);
